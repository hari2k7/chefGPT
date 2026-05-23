import Groq from "groq-sdk";
import Recipe from "../models/Recipe.js";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// POST /api/recipes/generate
export const generateRecipe = async (req, res) => {
  const { prompt } = req.body;

  if (!prompt || prompt.trim() === "") {
    return res.status(400).json({ error: "Prompt is required." });
  }

  try {
    const systemPrompt = `You are ChefGPT, an expert culinary AI assistant. Generate a detailed recipe based on the user's request.

Return ONLY a valid JSON object with this exact structure (no markdown, no extra text):
{
  "title": "Recipe Name",
  "ingredients": ["ingredient 1 with quantity", "ingredient 2 with quantity"],
  "instructions": [
    { "step": 1, "text": "Step description" },
    { "step": 2, "text": "Step description" }
  ],
  "prepTime": "15 minutes",
  "cookTime": "30 minutes",
  "servings": "4 servings",
  "difficulty": "Easy",
  "cuisine": "Italian",
  "tags": ["pasta", "vegetarian"]
}

User request: ${prompt}`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: systemPrompt }],
    });

    const rawText = completion.choices[0].message.content;

    const cleaned = rawText
      .replace(/```json\s*/gi, "")
      .replace(/```\s*/g, "")
      .trim();

    let recipeData;
    try {
      recipeData = JSON.parse(cleaned);
    } catch (parseErr) {
      console.error("JSON parse error:", parseErr.message);
      return res.status(500).json({ error: "AI returned invalid format. Please try again." });
    }

    const recipe = new Recipe({ ...recipeData, prompt: prompt.trim() });
    const saved = await recipe.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("Generate error:", err.message);
    res.status(500).json({ error: "Failed to generate recipe. " + err.message });
  }
};

// GET /api/recipes
export const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find().sort({ createdAt: -1 });
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/recipes/:id
export const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ error: "Recipe not found" });
    res.json(recipe);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE /api/recipes/:id
export const deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndDelete(req.params.id);
    if (!recipe) return res.status(404).json({ error: "Recipe not found" });
    res.json({ message: "Recipe deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PATCH /api/recipes/:id/favorite
export const toggleFavorite = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ error: "Recipe not found" });
    recipe.isFavorite = !recipe.isFavorite;
    await recipe.save();
    res.json(recipe);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};