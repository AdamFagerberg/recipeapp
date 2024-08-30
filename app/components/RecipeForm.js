import { useState } from "react";
import RecipeCard from "./RecipeCard";

function RecipeForm() {
  const [recipes, setRecipes] = useState([]);
  const [newRecipe, setNewRecipe] = useState({
    title: "",
    time: "",
    ingredients: "",
    instructions: "",
    imgSrc: "",
  });
  const [image, setImage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRecipe({ ...newRecipe, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result); // Save the uploaded image as a data-URL
      setNewRecipe({ ...newRecipe, imgSrc: reader.result });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleAddRecipe = (e) => {
    e.preventDefault();
    setRecipes([...recipes, { ...newRecipe, id: Date.now() }]);
    setNewRecipe({
      title: "",
      time: "",
      ingredients: "",
      instructions: "",
      imgSrc: "",
    });
    setImage(null); // Reset the uploaded image
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
    <div className="recipe-container">
      <div className="form-container">
        <h3 className="new">New Recipe</h3>
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
          <textarea
            id="instructions"
            name="instructions"
            value={newRecipe.instructions}
            onChange={handleInputChange}
            placeholder="Instructions"
            required
          />
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
          <button className="addBtn" type="submit">
            Add Recipe
          </button>
        </form>
      </div>

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
              imgSrc={recipe.imgSrc || "/img/Recept1.png"} // Use the uploaded image if available, otherwise use a default image
              imgAlt="image of dish"
              title={recipe.title}
              time={recipe.time}
              ingredients={recipe.ingredients}
              instructions={recipe.instructions}
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
