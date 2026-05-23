# ChefGPT

An AI-powered recipe generator built with the MERN stack and Groq (Llama 3.3).

Describe what you want to eat, what ingredients you have, or any cuisine — ChefGPT generates a complete recipe with ingredients, step-by-step instructions, prep/cook times, and more. Every recipe is saved to MongoDB so you can build your own cookbook over time.

---

## Stack

- **Frontend** — React 18, Vite, React Router, Axios
- **Backend** — Node.js, Express (ESM)
- **Database** — MongoDB Atlas, Mongoose
- **AI** — Groq API (Llama 3.3 70B)

---

## Project Structure

```
chefgpt/
├── backend/
│   ├── controllers/
│   │   └── recipeController.js
│   ├── models/
│   │   └── Recipe.js
│   ├── routes/
│   │   └── recipeRoutes.js
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
└── frontend/
    ├── src/
    │   ├── api/
    │   │   └── recipeApi.js
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   └── RecipeCard.jsx
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── Cookbook.jsx
    │   │   └── RecipeDetail.jsx
    │   ├── styles/
    │   │   └── global.css
    │   ├── App.jsx
    │   └── main.jsx
    ├── index.html
    └── vite.config.js
```

---

## Getting Started

### Prerequisites

- Node.js v18+
- MongoDB Atlas account — [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
- Groq API key — [console.groq.com](https://console.groq.com) (free, no billing required)

---

### 1. Clone the repository

```bash
git clone https://github.com/your-username/chefgpt.git
cd chefgpt
```

---

### 2. Backend

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
GROQ_API_KEY=your_groq_api_key
```

Start the server:

```bash
npm run dev
```

Server runs on `http://localhost:5000`

---

### 3. Frontend

```bash
cd frontend
npm install
```

Create a `.env` file:

```env
VITE_API_URL=http://localhost:5000
```

Start the dev server:

```bash
npm run dev
```

Frontend runs on `http://localhost:3000`

---

## API Reference

| Method | Endpoint                     | Description               |
|--------|------------------------------|---------------------------|
| POST   | /api/recipes/generate        | Generate and save a recipe |
| GET    | /api/recipes                 | Get all saved recipes      |
| GET    | /api/recipes/:id             | Get a single recipe        |
| DELETE | /api/recipes/:id             | Delete a recipe            |
| PATCH  | /api/recipes/:id/favorite    | Toggle favorite status     |

---

## Features

- Generate recipes from natural language prompts
- Save every recipe automatically to MongoDB
- Filter cookbook by saved, difficulty, or cuisine
- Mark recipes as favorites
- Full recipe detail view with ingredients and step-by-step instructions
- Delete recipes you no longer need

---

## Environment Variables

### Backend

| Variable     | Description                        |
|--------------|------------------------------------|
| PORT         | Port the server runs on (default 5000) |
| MONGO_URI    | MongoDB Atlas connection string    |
| GROQ_API_KEY | Your Groq API key                  |

### Frontend

| Variable      | Description                  |
|---------------|------------------------------|
| VITE_API_URL  | Backend base URL             |

---

## License

MIT