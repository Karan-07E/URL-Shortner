import express from 'express';
import cors from 'cors';
import { createShortUrl, RedirectShortUrl } from './controllers/UrlControls.js';
import dotenv from 'dotenv';
import connectDB from './config/config.js';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config({ quiet: true });

const app = express();
const PORT = process.env.PORT || 5001;

// ES Module __dirname fix
const __dirname = path.resolve();

app.use(express.json());

// Enable CORS for frontend communication
app.use(cors({ 
    origin: true, // Allow all origins in development and production
    credentials: true 
}));

// API route for creating short URLs
app.post('/api', createShortUrl);

// Route for redirecting short URLs
app.get('/:shortId', RedirectShortUrl);

// Serve frontend for all other routes (React Router support)
if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname,"../frontend","dist","index.html"));
});
};

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log('server running on port', PORT);
    });
});
