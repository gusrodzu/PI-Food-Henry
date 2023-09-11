const axios = require("axios");
const { Recipe } = require("../db");
const { Op } = require("sequelize");
require("dotenv").config();

const { API_KEY, URL } = process.env;
const getRecipeDiets = require("./getRecipeDiets");

// Función para obtener recetas por nombre desde diferentes fuentes
const getRecipeByName = async (name) => {
  try {
    // Consulta a la API externa para obtener recetas por nombre
    const recipesApi = await axios.get(
      `${URL}/complexSearch?query=${name}&apiKey=${API_KEY}&addRecipeInformation=true`
    );
    
    // Procesa y mapea las recetas obtenidas de la API
    const apiRecipes = await Promise.all(
      recipesApi.data.results.map(async ({ vegetarian, id, title, healthScore, image, diets }) => {
        // Obtiene las dietas procesadas para cada receta usando la función getRecipeDiets
        const processedDiets = await getRecipeDiets(vegetarian, diets);
        return { vegetarian, id, title, healthScore, image, diets: processedDiets };
      })
    );

    // Consulta a la base de datos local para obtener recetas por nombre
    const recipesDB = await Recipe.findAll({
      where: { title: { [Op.iLike]: `%${name}%` } },
    });

    // Procesa las recetas obtenidas de la base de datos
    const dbRecipes = await Promise.all(
      recipesDB.map(async (recipe) => {
        // Obtiene las dietas de cada receta desde la base de datos
        const diets = await recipe.getDiets({ raw: true });
        return { ...recipe.dataValues, diets: [...diets] };
      })
    );

    // Combina las recetas de la base de datos y de la API y retorna el resultado
    return [...dbRecipes, ...apiRecipes];
  } catch (error) {
    console.error("Error al obtener recetas por nombre:", error);
    throw error;
  }
};

module.exports = getRecipeByName;
