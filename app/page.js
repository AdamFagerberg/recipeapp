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

  function handleDelete(e) {
    console.log(e);
  }

  console.log(mockData);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <RecipeForm />
      {mockData ? (
        <div>
          {mockData.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              title={recipe.title}
              ingredients={recipe.ingredients}
              onDelete={(e) => handleDelete(e)}
            />
          ))}
        </div>
      ) : (
        <div>Loading..</div>
      )}
      {randomRecipe ? (
        <div>
          {randomRecipe.map((recipe) => (
            <RecipeCard
              key={recipe.idMeal}
              title={recipe.strMeal}
              imgSrc={recipe.strMealThumb}
              ingredients={recipe.strInstructions}
            />
          ))}
        </div>
      ) : (
        <div>Loading..</div>
      )}
    </main>
  );
}
