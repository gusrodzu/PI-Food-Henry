const { Router } = require("express");
const routeRecipes= require("./routeRecipes");
const routeDiets = require("./routeDiets");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const mainRouter = Router();

mainRouter.use("/recipes", routeRecipes); //Cuando  exista un endopoint que termine en "recipe" se enviara la request a "routeRecipes"
mainRouter.use("/diets", routeDiets); //Cuando  exista un endopoint que termine en "diets" se enviara request a "routeDiets"

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = mainRouter;
