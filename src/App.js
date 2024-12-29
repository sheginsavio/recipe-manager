import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import logo from './assets/logo.png';
import { Button } from '@mui/material';
import RecipeCard from './components/RecipeCard';
import RecipeDetail from './components/RecipeDetail';
import AddRecipe from './components/AddRecipe';
import EditRecipe from './components/EditRecipe';
import { db } from './firebase';
import { collection, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore';

function App() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      const querySnapshot = await getDocs(collection(db, 'recipes'));
      const recipesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRecipes(recipesData);
    };

    fetchRecipes();
  }, []);

  const addNewRecipe = async (recipe) => {
    try {
      const docRef = await addDoc(collection(db, 'recipes'), recipe);
      setRecipes([...recipes, { id: docRef.id, ...recipe }]);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  const updateRecipe = async (updatedRecipe) => {
    const recipeDoc = doc(db, 'recipes', updatedRecipe.id);
    await updateDoc(recipeDoc, updatedRecipe);
    setRecipes(
      recipes.map((recipe) =>
        recipe.id === updatedRecipe.id ? updatedRecipe : recipe
      )
    );
  };

  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <div>
      <Header handleHomeClick={handleHomeClick} />
      <div className="main-content">
        <Routes>
          <Route
            path="/"
            element={
              <div className="recipe-list">
                {recipes.map((recipe) => (
                  <RecipeCard
                    key={recipe.id}
                    recipe={recipe}
                    onClick={() => navigate(`/recipe/${recipe.id}`)}
                  />
                ))}
              </div>
            }
          />
          <Route
            path="/recipe/:id"
            element={<RecipeDetail recipes={recipes} />}
          />
          <Route
            path="/add-recipe"
            element={<AddRecipe onAddRecipe={addNewRecipe} />}
          />
          <Route
            path="/edit-recipe/:id"
            element={<EditRecipe recipes={recipes} onUpdateRecipe={updateRecipe} />}
          />
        </Routes>
      </div>
    </div>
  );
}

function Header({ handleHomeClick }) {
  const navigate = useNavigate();

  return (
    <header className="App-header">
      <img src={logo} alt="logo" className="logo" />
      <div className="header-buttons">
        <Button
          variant="contained"
          color="primary"
          style={{
            backgroundColor: 'rgb(40, 39, 39)',
            padding: '12px 24px',
            borderRadius: '5px',
            border: '1px solid white',
            color: 'white',
          }}
          onClick={handleHomeClick}
        >
          Home
        </Button>
        <Button
          variant="contained"
          color="secondary"
          style={{
            marginLeft: '10px',
            backgroundColor: 'rgb(40, 39, 39)',
            padding: '12px 24px',
            borderRadius: '5px',
            border: '1px solid white',
          }}
          onClick={() => navigate('/add-recipe')}
        >
          Add New Recipe
        </Button>
      </div>
    </header>
  );
}

export default App;
