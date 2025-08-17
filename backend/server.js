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
    origin: "*",
    credentials: true,
  })
);

const startServer = async () => {
  try {
    await connectDB();

    // API routes
    app.post("/api", createShortUrl);
    app.get("/api/:shortId", RedirectShortUrl);

    // Serve frontend in production
    if (process.env.NODE_ENV === "production") {
      app.use(express.static(path.join(__dirname, "../frontend/dist")));
      app.get("*", (_, res) =>
        res.sendFile(path.join(__dirname, "../frontend/dist/index.html"))
      );
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
