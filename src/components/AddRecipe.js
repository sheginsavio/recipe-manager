import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddRecipe.css';

function AddRecipe({ onAddRecipe }) {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const newRecipe = {
      name,
      image: image || 'https://via.placeholder.com/150',
      ingredients: ingredients.split(',').map((ing) => ing.trim()),
      instructions: instructions.split('.').map((inst) => inst.trim()).filter((inst) => inst),
    };

    onAddRecipe(newRecipe);
    navigate('/'); // Redirect to home page after adding the recipe
  };

  return (
    <div className="add-recipe">
      <h2>Add New Recipe</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Recipe Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Recipe Image URL:
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </label>
        <label>
          Ingredients (comma-separated):
          <input
            type="text"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            required
          />
        </label>
        <label>
          Instructions:
          <textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            required
          />
        </label>
        <button type="submit">Add Recipe</button>
      </form>
    </div>
  );
}

export default AddRecipe;
