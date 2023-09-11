const { Router } = require("express");
const {
  handlerIdRecipe,
  handlerGetRecipes,
  handlerPostRecipe,
} = require("../handlers/handlerRecipes");

const routeRecipes = Router();
routeRecipes.get("/:id", handlerIdRecipe); // Obtiene los detalles de una receta por su ID
routeRecipes.get("/", handlerGetRecipes);  // Obtiene todas las recetas  por su ID
routeRecipes.post("/", handlerPostRecipe); // Crea una receta
module.exports = routeRecipes;

// Define un módulo de rutas utilizando Express. Se definen tres rutas: una para obtener detalles 
// de una receta por su ID, otra para obtener todas las recetas y una tercera para agregar una nueva 
// receta. Cada ruta utiliza un controlador específico para manejar las solicitudes correspondientes.