const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    prompt: {
      type: String,
      required: true,
    },
    ingredients: [
      {
        type: String,
        trim: true,
      },
    ],
    instructions: [
      {
        step: Number,
        text: String,
      },
    ],
    prepTime: {
      type: String,
      default: "N/A",
    },
    cookTime: {
      type: String,
      default: "N/A",
    },
    servings: {
      type: String,
      default: "N/A",
    },
    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      default: "Medium",
    },
    cuisine: {
      type: String,
      default: "International",
    },
    tags: [String],
    isFavorite: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Recipe", recipeSchema);
