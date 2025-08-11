import express from 'express';
import cors from 'cors';
import { createShortUrl, RedirectShortUrl } from './controllers/UrlControls.js';
import dotenv from 'dotenv';
import connectDB from './config/config.js';
dotenv.config({quiet : true});

const app = express();
const PORT = process.env.PORT || 5001;

connectDB();
app.use(express.json());

// Enable CORS for frontend communication
const corsOptions = {
    origin: process.env.NODE_ENV === 'production' 
        ? ['https://url4uu.vercel.app'] 
        : ['http://localhost:5173', 'http://localhost:5174'],
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));



// API routes for creating URLs
app.post('/api', createShortUrl);

// Direct short URL redirect (without /api prefix)
app.get('/:shortId', RedirectShortUrl);


app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
});