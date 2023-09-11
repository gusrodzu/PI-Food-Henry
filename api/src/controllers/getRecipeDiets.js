const { Diet } = require("../db");
const { Op } = require("sequelize");
require("dotenv").config();

// Función para obtener y procesar las dietas de una receta
const getRecipeDiets = async (vegetarian, diets) => {
  try {
    // Buscar en la base de datos las dietas correspondientes a las dietNames
    let dietasDB = await Promise.all(
      diets.map(async (dietName) => {
        const diet = await Diet.findOne({
          where: { name: { [Op.iLike]: `%${dietName}` } },
        });
        return diet;
      })
    );

    // Si la receta es vegetariana, agregar la dieta "vegetarian" a las dietas
    if (vegetarian) {
      const vegetarianDiet = await Diet.findOne({
        where: { name: "vegetarian" },
      });
      dietasDB.push(vegetarianDiet);
    }

    // Retornar la lista de dietas procesadas
    return dietasDB;
  } catch (error) {
    console.error("Error al tratar de obtener las dietas:", error);
    throw error;
  }
};

module.exports = getRecipeDiets;
