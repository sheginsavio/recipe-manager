import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './EditRecipe.css';

function EditRecipe({ recipes, onUpdateRecipe }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const recipeToEdit = recipes.find((r) => r.id === id);
    if (recipeToEdit) {
      setRecipe(recipeToEdit);
    }
  }, [id, recipes]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (recipe) {
      onUpdateRecipe(recipe);
      navigate('/'); // Redirect to home page after editing the recipe
    }
  };

  if (!recipe) {
    return <div>Recipe not found.</div>;
  }

  return (
    <div className="edit-recipe">
      <h2>Edit Recipe</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Recipe Name:
          <input
            type="text"
            value={recipe.name}
            onChange={(e) => setRecipe({ ...recipe, name: e.target.value })}
            required
          />
        </label>
        <label>
          Recipe Image URL:
          <input
            type="text"
            value={recipe.image}
            onChange={(e) => setRecipe({ ...recipe, image: e.target.value })}
          />
        </label>
        <label>
          Ingredients (comma-separated):
          <input
            type="text"
            value={recipe.ingredients.join(', ')}
            onChange={(e) =>
              setRecipe({ ...recipe, ingredients: e.target.value.split(',').map((ing) => ing.trim()) })
            }
            required
          />
        </label>
        <label>
          Instructions:
          <textarea
            value={Array.isArray(recipe.instructions) ? recipe.instructions.join('. ') : recipe.instructions}
            onChange={(e) =>
              setRecipe({
                ...recipe,
                instructions: e.target.value.split('.').map((inst) => inst.trim()).filter((inst) => inst),
              })
            }
            required
          />
        </label>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default EditRecipe;
