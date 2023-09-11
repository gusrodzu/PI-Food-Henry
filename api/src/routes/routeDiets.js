const { Router } = require("express");
const handlerDiets = require("../handlers/handlerDiets");
const routeDiets = Router();

routeDiets.get("/", handlerDiets);

module.exports = routeDiets;


// Crea un módulo de rutas utilizando Express. Define una ruta GET en la ruta raíz ("/") 
// que utiliza el controlador handlerDiets para manejar las solicitudes. El controlador handlerDiets