const axios = require("axios");
require("dotenv").config();
const { API_KEY, URL, Num} = process.env;
const { Recipe } = require("../db");
const getRecipeDiets = require("./getRecipeDiets");

// Función para obtener recetas de la API y la base de datos
const getRecipes = async () => {
  try {

    // Obtiene kas  recetas de la API externa
    const recipesApi = await axios.get(
      `${URL}/complexSearch?apiKey=${API_KEY}&number=100&instructionsRequired=true&addRecipeInformation=true`
    );

    // Mapeary procesa las recetas obtenidas de la API
    const recipesFromApi = recipesApi.data.results.map(
      ({ vegetarian, id, title, healthScore, image, diets }) => ({
        vegetarian,
        id,
        title,
        healthScore,
        image,
        diets,
      })
    );

    // Obtene la información de dieta para las recetas de la API
    const recipesWithDiets = await Promise.all(
      recipesFromApi.map(async (recipe) => {
        recipe.diets = await getRecipeDiets(recipe.vegetarian, recipe.diets);
        return recipe;
      })
    );

    // Obtene las recetas almacenadas en la base de datos
    const recipesDB = await Recipe.findAll();
    
    // Procesa las  recetas obtenidas de la base de datos
    const recipesFromDB = await Promise.all(
      recipesDB.map(async (recipe) => {
        let diets = await recipe.getDiets({ raw: true });
        return { ...recipe.toJSON(), diets };
      })
    );

    // Combina recetas de la API y la base de datos y retornar el resultado con un "spread operator"
    return [...recipesFromDB, ... recipesWithDiets];

  } catch (error) {
    console.error("Error al obtener las recetas:", error);
    throw error;
  }
};

module.exports = getRecipes;
