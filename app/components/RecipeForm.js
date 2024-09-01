import { useState } from "react";
import RecipeCard from "./RecipeCard";

//<---------Åsa--------->//

function RecipeForm() {
  const [recipes, setRecipes] = useState([]); //recipes innehåller alla recept och uppdaterar state med nya
  const [newRecipe, setNewRecipe] = useState({
    //state för nytt recept
    title: "",
    time: "",
    ingredients: "",
    instructions: "",
    imgSrc: "",
  });
  const [image, setImage] = useState(null); //state för bild

  const handleInputChange = (e) => {
    //funktion för input change
    const { name, value } = e.target; //hämtar vilka inputfält som ändrats och det nya värdet
    setNewRecipe({ ...newRecipe, [name]: value }); //skapar kopia med nya datan
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0]; //hämtar filen från bilduppladdning
    const reader = new FileReader(); //filereader läser filen

    reader.onloadend = () => {
      setImage(reader.result); // Save the uploaded image as a data-URL
      setNewRecipe({ ...newRecipe, imgSrc: reader.result }); //Uppdaterar newRecipe med bilden
    };
    if (file) {
      reader.readAsDataURL(file); //om en fil valts, läs som data-URL
    }
  };

  //funktion för att lägga till recept
  const handleAddRecipe = (e) => {
    e.preventDefault();
    setRecipes([...recipes, { ...newRecipe, id: Date.now() }]); //lägger till det nya receptet i recipes
    setNewRecipe({
      //återställ formulär
      title: "",
      time: "",
      ingredients: "",
      instructions: "",
      imgSrc: "",
    });
    setImage(null); // Återställ bild
  };

  //<---------Helena--------->//
  const handleEditRecipe = (id) => {
    const recipe = recipes.find((r) => r.id === id);
    const updatedRecipe = {
      ...recipe,
      isEditing: true,
    };
    setRecipes(recipes.map((r) => (r.id === id ? updatedRecipe : r)));
  };

  const handleSaveRecipe = (id, updatedRecipe) => {
    setRecipes(
      recipes.map((r) =>
        r.id === id ? { ...updatedRecipe, id, isEditing: false } : r
      )
    );
  };

  const handleDeleteRecipe = (id) => {
    setRecipes(recipes.filter((r) => r.id !== id));
  };

  //<---------Åsa--------->//
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
          />
          <button className="addBtn" type="submit">
            Add Recipe
          </button>
        </form>
      </div>

      {/* <--------- Helena ---------> */}
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
                  })
                }
              />
              <textarea
                value={recipe.ingredients}
                onChange={(e) =>
                  handleSaveRecipe(recipe.id, {
                    ...recipe,
                    ingredients: e.target.value,
                  })
                }
              />
              <textarea
                value={recipe.instructions}
                onChange={(e) =>
                  handleSaveRecipe(recipe.id, {
                    ...recipe,
                    instructions: e.target.value,
                  })
                }
              />
              <button
                onClick={() => handleSaveRecipe(recipe.id, { ...recipe })}
              >
                Save
              </button>
            </div>
          ) : (
            <RecipeCard
              key={recipe.id}
              imgSrc={recipe.imgSrc || "/ulf_chef.jpeg"} // Uppladdad bild om tillgänglig, annars placeholder
              imgAlt="image of dish"
              title={recipe.title}
              time={recipe.time}
              ingredients={recipe.ingredients}
              instructions={recipe.instructions}
              onEdit={() => handleEditRecipe(recipe.id)}
              onDelete={() => handleDeleteRecipe(recipe.id)}
              onSave={(updatedRecipe) =>
                handleSaveRecipe(recipe.id, updatedRecipe)
              }
            />
          )
        )}
      </div>
    </div>
  );
}

export default RecipeForm;
