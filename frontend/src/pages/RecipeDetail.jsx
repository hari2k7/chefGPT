import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getRecipeById, deleteRecipe, toggleFavorite } from "../api/recipeApi";

export default function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchRecipe();
  }, [id]);

  const fetchRecipe = async () => {
    try {
      const { data } = await getRecipeById(id);
      setRecipe(data);
    } catch (err) {
      setError("Recipe not found.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm(`Delete "${recipe.title}"?`)) return;
    try {
      await deleteRecipe(id);
      navigate("/cookbook");
    } catch (err) {
      console.error(err);
    }
  };

  const handleFavorite = async () => {
    try {
      const { data } = await toggleFavorite(id);
      setRecipe(data);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading)
    return (
      <div className="generating-state">
        <div className="chef-spinner">🔍</div>
        <p>Loading recipe…</p>
      </div>
    );

  if (error)
    return (
      <div className="recipe-detail">
        <div className="error-toast" style={{ marginTop: "2rem" }}>
          ⚠️ {error}
        </div>
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Go back
        </button>
      </div>
    );

  return (
    <div className="recipe-detail fade-up">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      {/* Hero section */}
      <div className="detail-hero">
        <div className="detail-cuisine">{recipe.cuisine}</div>
        <h1 className="detail-title">{recipe.title}</h1>
        <div className="detail-meta">
          <div className="detail-meta-item">
            <span className="detail-meta-label">Prep Time</span>
            <span className="detail-meta-value">⏱️ {recipe.prepTime}</span>
          </div>
          <div className="detail-meta-item">
            <span className="detail-meta-label">Cook Time</span>
            <span className="detail-meta-value">🔥 {recipe.cookTime}</span>
          </div>
          <div className="detail-meta-item">
            <span className="detail-meta-label">Servings</span>
            <span className="detail-meta-value">👥 {recipe.servings}</span>
          </div>
          <div className="detail-meta-item">
            <span className="detail-meta-label">Difficulty</span>
            <span className="detail-meta-value">{recipe.difficulty}</span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="detail-body">
        {/* Ingredients */}
        <div className="detail-section">
          <h2 className="detail-section-title">🛒 Ingredients</h2>
          <ul className="ingredient-list">
            {recipe.ingredients?.map((ing, i) => (
              <li key={i} className="ingredient-item">
                <span className="ingredient-dot" />
                {ing}
              </li>
            ))}
          </ul>

          {recipe.tags?.length > 0 && (
            <>
              <div
                className="detail-section-title"
                style={{ marginTop: "1.5rem", fontSize: "0.95rem" }}
              >
                Tags
              </div>
              <div className="detail-tags">
                {recipe.tags.map((tag, i) => (
                  <span key={i} className="tag">
                    #{tag}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Instructions */}
        <div className="detail-section">
          <h2 className="detail-section-title">👨‍🍳 Instructions</h2>
          <ol className="step-list">
            {recipe.instructions?.map((inst, i) => (
              <li key={i} className="step-item">
                <div className="step-number">{inst.step || i + 1}</div>
                <p className="step-text">{inst.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Actions */}
      <div className="detail-actions">
        <button className="btn-primary" onClick={handleFavorite}>
          {recipe.isFavorite ? "💔 Remove Favorite" : "❤️ Add to Favorites"}
        </button>
        <button className="btn-danger" onClick={handleDelete}>
          🗑️ Delete Recipe
        </button>
      </div>

      {recipe.prompt && (
        <p
          style={{
            marginTop: "1.5rem",
            fontSize: "0.8rem",
            color: "#9a8a7a",
            fontStyle: "italic",
          }}
        >
          Generated from: "{recipe.prompt}"
        </p>
      )}
    </div>
  );
}
