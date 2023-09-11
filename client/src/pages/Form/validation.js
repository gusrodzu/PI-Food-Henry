export const validation = (form, setErrors, name) => {
  const regexURL = /^https?:\/\/[\w-]+(\.[\w-]+)+[/#?]?.*$/;
  const { title, summary, instructions, healthScore, image } = form;

  const mensajesDeError = {};

  const validarTitulo = () => {
    if (title.length > 50) {
      mensajesDeError.title = "El título no puede contener más de 50 caracteres";
    } else if (!title) {
      mensajesDeError.title = "El nombre de la receta no puede estar vacío";
    } else {
      mensajesDeError.title = "";
    }
  };

  const validarResumen = () => {
    if (summary.length > 1000) {
      mensajesDeError.summary = "El resumen no puede contener más de 1000 caracteres";
    } else if (!summary) {
      mensajesDeError.summary = "El resumen de la receta no puede estar vacío";
    } else {
      mensajesDeError.summary = "";
    }
  };

  const validarInstrucciones = () => {
    mensajesDeError.instructions = instructions.length
      ? ""
      : "Las instrucciones no pueden estar vacías";
  };

  const validarPuntuacionSalud = () => {
    if (healthScore === "") {
      mensajesDeError.healthScore = "La puntuación no puede estar vacía";
    } else if (healthScore > 100) {
      mensajesDeError.healthScore = "El límite de puntuación  es 100";
    } else {
      mensajesDeError.healthScore = "";
    }
  };

  const validarImagen = () => {
    if (image === "") {
      mensajesDeError.image = "El campo de la imagen no puede estar vacío";
    } else if (!regexURL.test(image)) {
      mensajesDeError.image = "URL no válida, prueba con una URL validad";
    } else {
      mensajesDeError.image = "";
    }
  };

  switch (name) {
    case "title":
      validarTitulo();
      break;
    case "summary":
      validarResumen();
      break;
    case "instructions":
      validarInstrucciones();
      break;
    case "healthScore":
      validarPuntuacionSalud();
      break;
    case "image":
      validarImagen();
      break;
    default:
      break;
  }

  setErrors(mensajesDeError);
};
