import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { generateRecipe } from "../api/recipeApi";
import RecipeCard from "../components/RecipeCard";

const SUGGESTIONS = [
  "Creamy mushroom risotto",
  "Spicy Thai basil chicken",
  "Quick pasta with ingredients at home",
  "Healthy vegan buddha bowl",
  "Classic French omelette",
  "South Indian sambar rice",
  "Chocolate lava cake for two",
  "Easy chicken tikka masala",
];

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [latestRecipe, setLatestRecipe] = useState(null);
  const navigate = useNavigate();

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setError("");
    setLoading(true);
    setLatestRecipe(null);
    try {
      const { data } = await generateRecipe(prompt.trim());
      setLatestRecipe(data);
      setPrompt("");
    } catch (err) {
      setError(
        err.response?.data?.error || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleGenerate();
    }
  };

  return (
    <>
      {/* Hero */}
      <div className="hero">
        <div className="hero-badge">✨ Powered by Gemini AI</div>
        <h1 className="hero-title">
          Your personal <em>AI Chef</em>
          <br />
          at your service
        </h1>
        <p className="hero-subtitle">
          Describe what you're craving, what's in your fridge, or any dish —
          ChefGPT crafts the perfect recipe instantly.
        </p>

        {/* Generate Form */}
        <div className="generate-form">
          {error && (
            <div className="error-toast">
              ⚠️ {error}
            </div>
          )}
          <div className="input-wrapper">
            <textarea
              className="prompt-input"
              rows={1}
              placeholder='Try "Pasta with leftover vegetables" or "Healthy dessert under 30 mins"…'
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              className="generate-btn"
              onClick={handleGenerate}
              disabled={loading || !prompt.trim()}
            >
              {loading ? (
                <>
                  Cooking
                  <span className="loading-dots">
                    <span /><span /><span />
                  </span>
                </>
              ) : (
                <>🍳 Generate</>
              )}
            </button>
          </div>

          <div className="suggestions">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                className="suggestion-chip"
                onClick={() => setPrompt(s)}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Generating spinner */}
      {loading && (
        <div className="generating-state">
          <div className="chef-spinner">👨‍🍳</div>
          <p>ChefGPT is crafting your recipe…</p>
        </div>
      )}

      {/* Latest generated recipe */}
      {latestRecipe && !loading && (
        <div style={{ maxWidth: 420, margin: "0 auto 3rem" }}>
          <div className="section-header">
            <h2 className="section-title">Fresh out of the kitchen 🎉</h2>
          </div>
          <RecipeCard
            recipe={latestRecipe}
            onUpdate={(updated) => setLatestRecipe(updated)}
            onDelete={() => setLatestRecipe(null)}
          />
          <div style={{ textAlign: "center", marginTop: "1rem" }}>
            <button
              className="btn-primary"
              onClick={() => navigate(`/recipe/${latestRecipe._id}`)}
            >
              📖 View Full Recipe
            </button>
          </div>
        </div>
      )}
    </>
  );
}
