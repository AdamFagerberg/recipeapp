"use client";
import RecipeForm from "./components/RecipeForm";
import { useEffect, useState } from "react";
import Recipes from "./mockdata/recipes.json";
import RecipeCard from "./components/RecipeCard";

export default function Home() {
  const [mockData, setMockData] = useState();
  const [randomRecipe, setRandomRecipe] = useState();

  useEffect(() => {
    async function fetchAPI() {
      try {
        const response = await fetch(
          "http://www.themealdb.com/api/json/v1/1/random.php"
        );
        const result = await response.json();
        console.log(result.meals);
        setRandomRecipe(result.meals);
      } catch (error) {
        console.log("Error: ", error);
      }
    }
    fetchAPI();
  }, []);

  useEffect(() => {
    setMockData(Recipes.recipes);
  }, []);

  function handleDeleteMock(id) {
    setMockData(mockData.filter((recipe) => recipe.id !== id));
    console.log(id);
  }

  function handleDeleteRandom(id) {
    setRandomRecipe(randomRecipe.filter((recipe) => recipe.idMeal !== id));
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="main-container">
        <RecipeForm />
        {mockData ? (
          <div>
            {mockData.map((recipe) => (
              <RecipeCard
                imgSrc={recipe.imageURL}
                key={recipe.id}
                title={recipe.title}
                ingredients={recipe.ingredients}
                onDelete={() => handleDeleteMock(recipe.id)}
                instructions={recipe.instructions}
              />
            ))}
          </div>
        ) : (
          <div>Loading..</div>
        )}
        {randomRecipe ? (
          <div>
            {randomRecipe.map((recipe) => {
              const ingredients = [];

              for (let i = 1; i <= 20; i++) {
                const ingredient = recipe[`strIngredient${i}`];
                const measure = recipe[`strMeasure${i}`];

                if (
                  ingredient &&
                  ingredient.trim() !== "" &&
                  measure &&
                  measure.trim() !== ""
                ) {
                  ingredients.push(`${measure} ${ingredient}`);
                }
              }

              return (
                <RecipeCard
                  key={recipe.idMeal}
                  title={recipe.strMeal}
                  imgSrc={recipe.strMealThumb}
                  ingredients={ingredients.join(", ")}
                  instructions={recipe.strInstructions}
                  onDelete={() => handleDeleteRandom(recipe.idMeal)}
                />
              );
            })}
          </div>
        ) : (
          <div>Loading..</div>
        )}
      </div>
    </main>
  );
}
