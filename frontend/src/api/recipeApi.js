import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: `${BASE_URL}/api`,
  headers: { "Content-Type": "application/json" },
});

export const generateRecipe = (prompt) =>
  api.post("/recipes/generate", { prompt });

export const getAllRecipes = () => api.get("/recipes");

export const getRecipeById = (id) => api.get(`/recipes/${id}`);

export const deleteRecipe = (id) => api.delete(`/recipes/${id}`);

export const toggleFavorite = (id) => api.patch(`/recipes/${id}/favorite`);

export default api;
