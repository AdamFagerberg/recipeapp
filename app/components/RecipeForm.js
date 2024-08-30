import { useState } from "react";
import RecipeCard from "./RecipeCard";

function RecipeForm() {
  const [recipes, setRecipes] = useState([]);
  const [newRecipe, setNewRecipe] = useState({
    title: "",
    time: "",
    ingredients: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRecipe({ ...newRecipe, [name]: value });
  };

  const handleAddRecipe = (e) => {
    e.preventDefault();
    setRecipes([...recipes, { ...newRecipe, id: Date.now() }]);
    setNewRecipe({ title: "", time: "", ingredients: "" });
  };

  const handleEditRecipe = (id) => {
    const recipe = recipes.find((r) => r.id === id);
    const updatedRecipe = {
      ...recipe,
      isEditing: true,
    };
    setRecipes(recipes.map((r) => (r.id === id ? updatedRecipe : r)));
  };

  const handleSaveRecipe = (id, updatedRecipe) => {
    setRecipes(recipes.map((r) => (r.id === id ? updatedRecipe : r)));
  };

  const handleDeleteRecipe = (id) => {
    setRecipes(recipes.filter((r) => r.id !== id));
  };

  return (
    <div className="formcontainer">
      <form onSubmit={handleAddRecipe} id="recipeForm">
        <input
          type="text"
          id="title"
          name="title"
          value={newRecipe.title}
          onChange={handleInputChange}
          placeholder="Recipe Title"
          required
        />
        <input
          type="text"
          id="time"
          name="time"
          value={newRecipe.time}
          onChange={handleInputChange}
          placeholder="Cooking Time"
          required
        />
        <textarea
          id="ingredients"
          name="ingredients"
          value={newRecipe.ingredients}
          onChange={handleInputChange}
          placeholder="Ingredients"
          required
        />
        <button type="submit">Add Recipe</button>
      </form>

      <div id="recipesContainer">
        {recipes.map((recipe) =>
          recipe.isEditing ? (
            <div key={recipe.id}>
              <input
                type="text"
                value={recipe.title}
                onChange={(e) =>
                  handleSaveRecipe(recipe.id, {
                    ...recipe,
                    title: e.target.value,
                    isEditing: false,
                  })
                }
              />
              <input
                type="text"
                value={recipe.time}
                onChange={(e) =>
                  handleSaveRecipe(recipe.id, {
                    ...recipe,
                    time: e.target.value,
                    isEditing: false,
                  })
                }
              />
              <textarea
                value={recipe.ingredients}
                onChange={(e) =>
                  handleSaveRecipe(recipe.id, {
                    ...recipe,
                    ingredients: e.target.value,
                    isEditing: false,
                  })
                }
              />
              <button
                onClick={() =>
                  handleSaveRecipe(recipe.id, { ...recipe, isEditing: false })
                }
              >
                Save
              </button>
            </div>
          ) : (
            <RecipeCard
              key={recipe.id}
              imgSrc="/img/Recept1.png"
              imgAlt="image of dish"
              title={recipe.title}
              time={recipe.time}
              ingredients={recipe.ingredients}
              onEdit={() => handleEditRecipe(recipe.id)}
              onDelete={() => handleDeleteRecipe(recipe.id)}
            />
          )
        )}
      </div>
    </div>
  );
}

export default RecipeForm;
