# 🔗 URL Shortener

A simple MERN stack URL shortener application. Users can shorten long URLs into easy-to-share short links and get redirected when visiting them.
Live Demo: https://url4uu.onrender.com

# ✨ Features

- Shorten any valid URL into a unique short link

- Automatic redirection when visiting the short link

- Frontend built with React + Vite

- Backend built with Express + MongoDB

- Deployed on Render

- Environment-specific configuration with .env.development and .env.production

# 🛠️ Tech Stack

- Frontend: React, Vite, Axios, Tailwind (if used)

- Backend: Node.js, Express, MongoDB (Mongoose)

- Deployment: Render

- Environment Variables: Vite environment system

# ⚙️ Installation
1. Clone the repository
git clone https://github.com/yourusername/url-shortener.git
cd url-shortener

2. Backend Setup
cd backend
npm install


Create a .env file inside backend/ with:

MONGO_URI=your_mongodb_connection_string
PORT=5001
NODE_ENV=development


Run the backend:

npm run dev

3. Frontend Setup
cd frontend
npm install


Environment files:

.env.development

VITE_API_URL=http://localhost:5001
VITE_BASE_URL=http://localhost:5001


.env.production

VITE_API_URL=https://url4uu.onrender.com
VITE_BASE_URL=https://url4uu.onrender.com


Run the frontend (development):

npm run dev


Build for production:

npm run build

# 🚀 Deployment (Render)

Deploy backend as a Render Web Service

Start command: node backend/server.js

Deploy frontend as a Render Static Site

Publish directory: frontend/dist

Build command: npm install && npm run build

Update .env.production with your live URLs.

# 📸 Screenshots

<img width="858" height="798" alt="image" src="https://github.com/user-attachments/assets/16fc2b22-0140-4d5f-9193-dd53b1617dc2" />

# 📖 API Endpoints
Create a short URL

      POST /api

      {
        "originalUrl": "https://example.com/very/long/url"
      }


      Response:

      {
        "shortId": "l44rLXU",
        "shortUrl": "https://url4uu.onrender.com/l44rLXU"
      }

      Redirect to original URL

      GET /:shortId

      Example: https://url4uu.onrender.com/l44rLXU → Redirects to original URL

# 👨‍💻 Author

Made with ❤️ by Karan M.

Contributions are Welcomed...
