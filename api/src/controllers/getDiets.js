const axios = require("axios");
const { Diet } = require("../db");
require("dotenv").config();
const { API_KEY, URL, Num} = process.env;



// Función para obtener y sincronizar las dietas desde la API externa o la base de datos local
const getDiets = async () => {
  try {
    // Consulta las dietas almacenadas en la base de datos local
    let diets = await Diet.findAll();

    // Si no se encuentran dietas en la base de datos, obtenerlas de la API externa
    if (!diets.length) {
      // Consultar recetas desde la API para extraer las dietas
      const { data } = await axios.get(
        `${URL}/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`
      );

      // Crear un conjunto de las dietas obtenidas de la API y agregar "vegetarian" como dieta
      const apiDiets = new Set(data.results.flatMap(recipe => recipe.diets));
      apiDiets.add("vegetarian");

      // Preparar registros de dietas para insertar en la base de datos
      const dietRecords = Array.from(apiDiets, diet => ({ name: diet }));
      await Diet.bulkCreate(dietRecords);

      // Actualizar la lista de dietas después de insertarlas en la base de datos
      diets = await Diet.findAll();
    }

    // Retornar la lista de dietas (ya sea desde la API o la base de datos)
    return diets;
  } catch (error) {
    console.error("Error al obtener las dietas:", error);
    throw error;
  }
};

module.exports = getDiets;
