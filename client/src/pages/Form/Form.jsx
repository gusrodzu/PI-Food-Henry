import React, { useEffect, useState } from "react";
import style from "./Form.module.css";
import { validation } from "./validation";
import { useDispatch, useSelector } from "react-redux";
import { getDiets, postRecipe } from "../../Redux/actions";
import { Link } from "react-router-dom";
// Imagenes
import loading from "../../assets/download.png";

const Form = () => {
  const dispatch = useDispatch();
  const diets = useSelector((state) => state.diets);

  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);

  const [form, setForm] = useState({
    title: "",
    summary: "",
    healthScore: 0,
    instructions: "",
    image: "",
    diets: [],
  });

  const [errors, setErrors] = useState({
    title: "",
    summary: "",
    healthScore: "",
    instructions: "",
    image: "",
    diets: "",
  });

  const handleChange = (event) => {
    const { value, name } = event.target;
    const regexNum = /^([0-9])*$/;

    if (regexNum.test(name)) {
      const selectedDiet = diets.find((diet) => diet.id === parseInt(name));
      const selectedDietName = selectedDiet ? selectedDiet.name : "";

      if (!form.diets.includes(selectedDietName)) {
        setForm({ ...form, diets: [...form.diets, selectedDietName] });
      } else {
        setForm({
          ...form,
          diets: [...form.diets.filter((diet) => diet !== selectedDietName)],
        });
      }
    } else {
      setForm({ ...form, [name]: value });
      validation({ [name]: value }, setErrors, name);
    }
  };

  const isFormValid = () => {
    return (
      form.title &&
      form.summary &&
      form.healthScore &&
      form.instructions &&
      form.image &&
      form.diets.length > 0 &&
      !Object.values(errors).some((error) => error !== "")
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isFormValid()) {
      alert("Receta creada correctamente");
      dispatch(postRecipe(form));
      setForm({
        title: "",
        summary: "",
        healthScore: 0,
        instructions: "",
        image: "",
        diets: [],
      });
    } else {
      alert("Por favor, completa todos los campos.");
    }
  };

  return (
    <div className={style.container}>
      <div className={style.content}>
        <form onSubmit={handleSubmit} className={style.form}>
          <h1 className={style.title}>Crea tu propia Receta</h1>
          <br></br>

          {/* Imagen */}
          <div className={style.field}>
            <label htmlFor="image" className={style.text}>
              Imagen
            </label>
            <input
              onChange={handleChange}
              placeholder=""
              type="text"
              name="image"
              value={form.image}
              className={errors.image ? style.error : style.input}
            />
            {errors.image && (
              <span className={style.error}>{errors.image}</span>
            )}
          </div>

          {/* Nombre */}
          <div className={style.field}>
            <label className={style.text}>Nombre de la receta:</label>
            <input
              onChange={handleChange}
              placeholder=""
              type="text"
              name="title"
              value={form.title}
              className={errors.title ? style.error : style.input}
            />
            {errors.title && (
              <span className={style.error}>{errors.title}</span>
            )}
          </div>

          {/* Resumen */}
          <div className={style.field}>
            <label htmlFor="summary" className={style.text}>
              Resumen
            </label>
            <textarea
              onChange={handleChange}
              placeholder=""
              type="text"
              name="summary"
              value={form.summary}
              className={errors.summary ? style.error : style.input}
            />
            {errors.summary && (
              <span className={style.error}>{errors.summary}</span>
            )}
          </div>

        

          {/* Instrucciones */}
          <div className={style.field}>
            <label htmlFor="instructions" className={style.text}>
              Instrucciones
            </label>
            <textarea
              onChange={handleChange}
              placeholder=""
              type="text"
              name="instructions"
              value={form.instructions}
              className={errors.instructions ? style.error : style.input}
            />
            {errors.instructions && (
              <span className={style.error}>{errors.instructions}</span>
            )}
          </div>

            {/* Puntuación */}
            <div className={style.field}>
            <label htmlFor="healthScore" className={style.text}>
              Puntuación
            </label>
            <input
              onChange={handleChange}
              type="number"
              name="healthScore"
              value={form.healthScore}
              className={errors.healthScore ? style.error : style.input}
              min="0"
            />
            {errors.healthScore && (
              <span className={style.error}>{errors.healthScore}</span>
            )}
          </div>

          {/* Tipo de dieta */}
          <div className={style.field}>
            <label htmlFor="checkbox" className={style.text}>
              {" "}
              Dietas:
            </label>

            <div className={style.types}>
              {diets.map((diet) => {
                const isChecked = form.diets.includes(diet.name);
                return (
                  <div key={diet.id}>
                    <label htmlFor={diet.id} className={style.type}>
                      {diet.name.toUpperCase()}

                      <input
                        type="checkbox"
                        name={diet.id}
                        id={diet.id}
                        checked={isChecked}
                        onChange={handleChange}
                      />
                    </label>
                  </div>
                );
              })}
            </div>
          </div>

          <button
            type="submit"
            id="submit"
            disabled={!isFormValid()}
            className={style.button}
          >
            {isFormValid() ? "Crear" : "Crear"}
          </button>

          <div className={style.navBar}>
            <Link to="/home" className={style.buttonblack}>
              Regresar
            </Link>
          </div>
        </form>

        {/* Tarjeta de Creación */}
        <div className={style.cardhold}>
          <div className={style.cardinfo}>
            <img src={form.image ? form.image : loading}  alt="Imagen de la receta" />
            <p>Nombre: {form.title}</p>
            <p>Resumen: {form.summary}</p>
            <p>Puntuación: {form.healthScore}</p>
            <p>Instrucciones: {form.instructions}</p>
            <p>Tipo de dieta: {form.diets.join(", ")}</p>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Form;
