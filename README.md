# 👨‍🍳 ChefGPT – AI Recipe Generator

A full-stack AI-powered Recipe Generator built with the **MERN stack** and **Google Gemini API**.

---

## ✨ Features

- 🤖 AI recipe generation via **Google Gemini 1.5 Flash**
- 💾 Save all recipes to **MongoDB Atlas**
- ❤️ Favorite & filter recipes
- 🔍 View full step-by-step recipe details
- 🗑️ Delete recipes
- 📱 Responsive, polished UI

---

## 🛠️ Tech Stack

### Frontend
- React 18 + Vite
- React Router DOM
- Axios
- Custom CSS (no UI libraries)

### Backend
- Node.js + Express.js
- MongoDB Atlas + Mongoose
- Google Generative AI SDK (`@google/generative-ai`)

---

## 📁 Project Structure

```
chefgpt/
├── backend/
│   ├── controllers/
│   │   └── recipeController.js   # Gemini AI + CRUD logic
│   ├── models/
│   │   └── Recipe.js             # Mongoose schema
│   ├── routes/
│   │   └── recipeRoutes.js       # Express routes
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
└── frontend/
    ├── src/
    │   ├── api/
    │   │   └── recipeApi.js      # Axios API helpers
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   └── RecipeCard.jsx
    │   ├── pages/
    │   │   ├── Home.jsx          # Generate recipe
    │   │   ├── Cookbook.jsx      # All saved recipes
    │   │   └── RecipeDetail.jsx  # Full recipe view
    │   ├── styles/
    │   │   └── global.css
    │   ├── App.jsx
    │   └── main.jsx
    ├── .env.example
    ├── index.html
    └── vite.config.js
```

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone <your-repo-url>
cd chefgpt
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create `.env`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
```

> Get your Gemini API key at: https://aistudio.google.com/app/apikey

Start backend:

```bash
npm run dev
```

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create `.env`:

```env
VITE_API_URL=http://localhost:5000
```

Start frontend:

```bash
npm run dev
```

Frontend runs on `http://localhost:3000`

---

## 🔌 API Endpoints

| Method | Route                        | Description          |
|--------|------------------------------|----------------------|
| POST   | /api/recipes/generate        | Generate + save recipe |
| GET    | /api/recipes                 | Get all recipes      |
| GET    | /api/recipes/:id             | Get single recipe    |
| DELETE | /api/recipes/:id             | Delete recipe        |
| PATCH  | /api/recipes/:id/favorite    | Toggle favorite      |

---

## 👤 Author

Built with ❤️ using MERN + Gemini AI
