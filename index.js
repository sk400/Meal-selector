import { recipes } from "./data.js";

const form = document.getElementById("preferences-form");

const createRecipeCard = (recipe) => {
  const { name, cuisine, dietary, ingredients } = recipe;
  const card = document.createElement("div");
  card.classList.add("recipe-card");
  card.innerHTML = `
    <h2>${name}</h2>
    <p>Cuisine: ${cuisine}</p>
    <p>Dietary: ${dietary.join(", ")}</p>
    <p>Ingredients: ${ingredients.join(", ")}</p>
  `;
  return card;
};
const checkIsValidDR = (dr) => {
  const hasDietaryRestriction = (recipe) => recipe.dietary.includes(dr);
  const filteredDRRecipes = recipes.filter(hasDietaryRestriction);
  return { isValid: filteredDRRecipes.length > 0, recipes: filteredDRRecipes };
};

const getAnyRandomRecipe = () =>
  recipes[Math.floor(Math.random() * recipes.length)];

const filterRecipeByCuisine = (cuisine, recipesArray) =>
  recipesArray.filter((recipe) => recipe.cuisine === cuisine);

const getRandomRecipeFromAnArray = (array) =>
  array[Math.floor(Math.random() * array.length)];

function onSubmit(event) {
  event.preventDefault();

  const dietRestriction = form.diet.value;
  const selectedCuisine = form.cuisine.value;
  const recipeDetails = document.getElementById("recipe-details");

  const hasDietaryRestriction = dietRestriction.trim() !== "";
  const isAnyCuisine = selectedCuisine === "any";

  let filteredRecipes = recipes;

  if (hasDietaryRestriction) {
    const { isValid, recipes: filteredDRRecipes } =
      checkIsValidDR(dietRestriction);

    filteredRecipes = isValid ? filteredDRRecipes : recipes;
  }

  if (!isAnyCuisine) {
    filteredRecipes = filterRecipeByCuisine(selectedCuisine, filteredRecipes);
  }

  const selectedRecipe = getRandomRecipeFromAnArray(filteredRecipes);

  recipeDetails.innerHTML = "";

  if (!selectedRecipe) {
    recipeDetails.innerHTML = "No recipes found.";
    return;
  }

  const card = createRecipeCard(selectedRecipe);

  recipeDetails.appendChild(card);
}

window.onload = () => {
  const randomRecipe = getAnyRandomRecipe();
  const recipeDetails = document.getElementById("recipe-details");
  const card = createRecipeCard(randomRecipe);
  recipeDetails.appendChild(card);
};

form.onsubmit = onSubmit;

console.log("Saumya" === "Saumya");
