import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './RecipeDetail.css';

const RecipeDetail = ({ recipes }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  if (!recipes || recipes.length === 0) {
    return <div>Recipes are not available.</div>;
  }

  const recipe = recipes.find((r) => r.id === id);

  if (!recipe) {
    return <div>Recipe not found.</div>;
  }

  return (
    <div className="recipe-detail">
      <h1>{recipe.name}</h1>
      <img src={recipe.image} alt={recipe.name} />
      <h2>Ingredients</h2>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <h2>Instructions</h2>
      <ul>
        {(Array.isArray(recipe.instructions) ? recipe.instructions : [recipe.instructions]).map((instruction, index) => (
          <li key={index}>{instruction}</li>
        ))}
      </ul>
      <button onClick={() => navigate(`/edit-recipe/${recipe.id}`)}>Edit Recipe</button>
    </div>
  );
};

export default RecipeDetail;
