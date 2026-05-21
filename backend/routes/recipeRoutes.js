const express = require("express");
const router = express.Router();
const {
  generateRecipe,
  getAllRecipes,
  getRecipeById,
  deleteRecipe,
  toggleFavorite,
} = require("../controllers/recipeController");

router.post("/generate", generateRecipe);
router.get("/", getAllRecipes);
router.get("/:id", getRecipeById);
router.delete("/:id", deleteRecipe);
router.patch("/:id/favorite", toggleFavorite);

module.exports = router;
