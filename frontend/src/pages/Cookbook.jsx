import { useState, useEffect } from "react";
import { getAllRecipes } from "../api/recipeApi";
import RecipeCard from "../components/RecipeCard";

const FILTERS = ["All", "Favorites", "Easy", "Medium", "Hard"];

export default function Cookbook() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const { data } = await getAllRecipes();
      setRecipes(data);
    } catch (err) {
      setError("Failed to load recipes.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = (updated) => {
    setRecipes((prev) =>
      prev.map((r) => (r._id === updated._id ? updated : r))
    );
  };

  const handleDelete = (id) => {
    setRecipes((prev) => prev.filter((r) => r._id !== id));
  };

  const filtered = recipes.filter((r) => {
    if (filter === "All") return true;
    if (filter === "Favorites") return r.isFavorite;
    return r.difficulty === filter;
  });

  if (loading)
    return (
      <div className="generating-state">
        <div className="chef-spinner">📚</div>
        <p>Loading your cookbook…</p>
      </div>
    );

  return (
    <>
      <div className="section-header" style={{ marginTop: "1.5rem" }}>
        <h2 className="section-title">My Cookbook</h2>
        <span className="section-count">{recipes.length} recipes saved</span>
      </div>

      {error && <div className="error-toast">⚠️ {error}</div>}

      <div className="filter-bar">
        {FILTERS.map((f) => (
          <button
            key={f}
            className={`filter-btn${filter === f ? " active" : ""}`}
            onClick={() => setFilter(f)}
          >
            {f === "Favorites" ? "❤️ " : ""}
            {f}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">
            {filter === "Favorites" ? "💔" : "🍽️"}
          </div>
          <h3>
            {filter === "Favorites"
              ? "No favorites yet"
              : "No recipes found"}
          </h3>
          <p>
            {filter === "Favorites"
              ? "Heart a recipe to save it here."
              : "Generate some recipes to fill your cookbook!"}
          </p>
        </div>
      ) : (
        <div className="recipe-grid">
          {filtered.map((recipe) => (
            <RecipeCard
              key={recipe._id}
              recipe={recipe}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </>
  );
}
