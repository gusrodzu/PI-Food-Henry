// Configurar el store: Crea un archivo para configurar el store de Redux. El store es el objeto central que almacena el estado de la aplicación y proporciona métodos para acceder y actualizar dicho estado.

// Importación de las funciones y módulos necesarios de Redux
import { createStore, applyMiddleware, compose } from "redux";

// Importación del reducer de la aplicación
import reducer from "./reducer";

// Importación del middleware "thunk" para manejar acciones asíncronas
import thunkMiddleware from "redux-thunk";

// Configuración de la extensión de Redux DevTools o uso de "compose" si no está disponible
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Creación del store de Redux
const store = createStore(
  reducer, // Se pasa el reducer que manejará las acciones y el estado
  composeEnhancer(applyMiddleware(thunkMiddleware)) // Aplicación del middleware "thunk" y configuración de Redux DevTools
);

// Exportación del store configurado para su uso en la aplicación
export default store;
