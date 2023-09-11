// Definir acciones: Crea un archivo para definir las acciones de Redux. 
// Las acciones son objetos que describen un cambio de estado y deben tener un tipo único que las identifique.

import axios from "axios";
import {
  GET_RECIPES,
  ADD_RECIPE_DETAIL,
  CLEAN_DETAIL,
  SEARCH_RECIPE,
  GET_DIETS,
  POST_RECIPE,
  ORDER,
  FILTER,
  POST_RECIPE_ERROR,
  GET_DIETS_ERROR,
  GET_RECIPES_ERROR,
  ADD_RECIPE_DETAIL_ERROR,
  SEARCH_RECIPE_ERROR,
} from "./types";

const DIETS_API_URL = "/diets";
const RECIPES_API_URL = "/recipes";

///////FILTRO Y ORDENADO///////

// Acción para ordenar
export const order = (judgment) => ({ type: ORDER, payload: judgment });

// Acción para filtrar
export const filter = (judgment) => ({ type: FILTER, payload: judgment });


///////Dietas///////

// Acción para obtener las dietas
export const getDiets = () => async (dispatch) => {
  try {
    const response = await axios.get(DIETS_API_URL);
    dispatch({ type: GET_DIETS, payload: response.data });
  } catch (error) {
    dispatch({ type: GET_DIETS_ERROR, payload: error.message });
  }
};

///////Recetas///////

// Acción para obtener las recetas
export const getRecipes = () => async (dispatch) => {
  try {
    const response = await axios.get(RECIPES_API_URL);
    dispatch({ type: GET_RECIPES, payload: response.data });
  } catch (error) {
    dispatch({ type: GET_RECIPES_ERROR, payload: error.message });
  }
};

// Acción para agregar detalles de una receta
export const addRecipeDetail = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`${RECIPES_API_URL}/${id}`);
    dispatch({ type: ADD_RECIPE_DETAIL, payload: response.data });
  } catch (error) {
    dispatch({ type: ADD_RECIPE_DETAIL_ERROR, payload: error.message });
  }
};

// Acción para limpiar los detalles de la receta
export const cleanDetail = () => ({ type: CLEAN_DETAIL });

// Acción para buscar recetas por nombre
export const searchRecipe = (name) => async (dispatch) => {
  try {
    const url = name ? `${RECIPES_API_URL}/?name=${name}` : RECIPES_API_URL;
    const response = await axios.get(url);
    dispatch({ type: SEARCH_RECIPE, payload: response.data });
  } catch (error) {
    dispatch({ type: SEARCH_RECIPE_ERROR, payload: error.message });
  }
};

// Acción para agregar una nueva receta
export const postRecipe = (recipe) => async (dispatch) => {
  try {
    const response = await axios.post(RECIPES_API_URL, recipe);
    dispatch({ type: POST_RECIPE, payload: response.data });
  } catch (error) {
    dispatch({ type: POST_RECIPE_ERROR, payload: error.message });
  }
};



