const { Recipe, Diet } = require("../db");

// Función para crear y asociar una nueva receta con dietas
const postRecipe = async ({
  title,
  summary,
  healthScore,
  instructions,
  image,
  diets,
}) => {
  try {
    // Crea la receta en la base de datos
    const recipe = await Recipe.create({
      title,
      summary,
      healthScore,
      instructions,
      image,
    });

    // Buscar instancias de las dietas usando sus nombres en la lista de dietas proporcionada
    const dietInstances = await Diet.findAll({
      where: { name: diets.map((diet) => diet.toString()) },
    });

    // Asociar las dietas con la receta recién creada
    await recipe.addDiets(dietInstances);

    // Retornar la receta creada con las dietas asociadas
    return recipe;
    
  } catch (error) {
    console.error("Error al crear la receta:", error);
    throw error;
  }
};

module.exports = postRecipe;
