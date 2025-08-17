import express from "express";
import cors from "cors";
import { createShortUrl, RedirectShortUrl } from "./controllers/UrlControls.js";
import dotenv from "dotenv";
import connectDB from "./config/config.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config({ quiet: true });

const app = express();
const PORT = process.env.PORT || 5001;

// ES Module __dirname fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());

// Enable CORS
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174", 
      "https://url4uu.onrender.com"
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
  })
);

const startServer = async () => {
  try {
    await connectDB();

    // Health check endpoint
    app.get("/health", (req, res) => {
      res.json({ status: "OK", message: "Server is running" });
    });

    // API routes (namespaced under /api)
    app.post("/api", createShortUrl);
    app.get("/:shortId", RedirectShortUrl);

    // Serve frontend in production
    if (process.env.NODE_ENV === "production") {
      const distPath = path.join(__dirname, "../frontend/dist");
      app.use(express.static(distPath));
      
      app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
  });
    }

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
