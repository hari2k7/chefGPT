import { useNavigate } from "react-router-dom";
import { toggleFavorite, deleteRecipe } from "../api/recipeApi";

export default function RecipeCard({ recipe, onUpdate, onDelete }) {
  const navigate = useNavigate();

  const handleFavorite = async (e) => {
    e.stopPropagation();
    try {
      const { data } = await toggleFavorite(recipe._id);
      onUpdate(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    if (!confirm(`Delete "${recipe.title}"?`)) return;
    try {
      await deleteRecipe(recipe._id);
      onDelete(recipe._id);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      className="recipe-card fade-up"
      onClick={() => navigate(`/recipe/${recipe._id}`)}
    >
      <div className="card-header">
        <div className="card-cuisine">{recipe.cuisine}</div>
        <div className="card-title">{recipe.title}</div>
        <button
          className={`card-fav-btn${recipe.isFavorite ? " active" : ""}`}
          onClick={handleFavorite}
          title={recipe.isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          {recipe.isFavorite ? "❤️" : "🤍"}
        </button>
      </div>

      <div className="card-body">
        <div className="card-meta">
          <span className="meta-item">
            <span className="meta-icon">⏱️</span>
            {recipe.prepTime}
          </span>
          <span className="meta-item">
            <span className="meta-icon">🔥</span>
            {recipe.cookTime}
          </span>
          <span className="meta-item">
            <span className="meta-icon">👥</span>
            {recipe.servings}
          </span>
          <span className={`difficulty-badge ${recipe.difficulty}`}>
            {recipe.difficulty}
          </span>
        </div>

        {recipe.tags?.length > 0 && (
          <div className="card-tags">
            {recipe.tags.slice(0, 4).map((tag, i) => (
              <span key={i} className="tag">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="card-actions">
        <button className="view-btn">
          View Recipe →
        </button>
        <button className="delete-btn" onClick={handleDelete} title="Delete">
          🗑️
        </button>
      </div>
    </div>
  );
}
