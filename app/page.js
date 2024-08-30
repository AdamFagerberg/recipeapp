"use client"
import RecipeForm from "./components/RecipeForm"
import { useEffect, useState } from "react";
import Recipes from "./mockdata/recipes.json";

export default function Home() {
  const [mockData, setMockData] = useState();

  useEffect(() => {
    setMockData(Recipes.recipes);
  }, []);

  console.log(mockData);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24"> <RecipeForm /></main>
  );
}
