import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./Home.module.css";
import { filter, getDiets, getRecipes, order } from "../../Redux/actions";
import { Link } from "react-router-dom";
// import Pagination from "../../components/Pagination/Pagination";
import Cards from "../../components/Cards/Cards";
import Footer from "../../components/Footer/Footer";

// IMAGENES
import chef from "../../assets/Chef.png";
import plato from "../../assets/plato.png";

const Home = ({ currentPage, setCurrentPage }) => {
  const dispatch = useDispatch();
  const { recipes, diets } = useSelector((state) => state);

  const [recipesPerPage] = useState(12);

  const totalRecipes = recipes.length;
  const lastIndex = currentPage * recipesPerPage;
  const firstIndex = lastIndex - recipesPerPage;

  const handleOrder = (event) => {
    const { value } = event.target;
    dispatch(order(value));
    setCurrentPage(1);
  };
  const handleFilter = (event) => {
    const { value, name } = event.target;
    if (name === "diets") {
      const originFilter = document.querySelector(
        'select[name="origin"]'
      ).value;
      if (originFilter === "") {
        alert("Debes seleccionar primero el filtro de origen.");
        return;
      }
    }
    dispatch(filter(value));
    setCurrentPage(1);
  };

  useEffect(() => {
    dispatch(getDiets());
    dispatch(getRecipes());
  }, [dispatch]);

  return (
    <div>
      <aside className={style.containerhome}>
        <div className={style.leftSide}>
          <p>Selecciona las opciones que deseas aplicar.</p>

          <label className={style.label}>Origen</label>
          <select
            className={style.select}
            name="origin"
            onChange={handleFilter}
            defaultValue=""
          >
            <option value="" disabled hidden>
              Origen
            </option>
            <option value="AllData">Todos</option>
            <option value="db">Base de datos</option>
            <option value="api">API</option>
          </select>

          <label className={style.label}>Tipo de dieta</label>
          <select
            className={style.select}
            name="diets"
            onChange={handleFilter}
            defaultValue=""
          >
            <option value="" disabled hidden>
              Tipo de dieta
            </option>
            <option value="AllDiets">All</option>
            {diets.length ? (
              diets.map((diet) => {
                return <option key={diet.id}>{diet.name}</option>;
              })
            ) : (
              <Fragment></Fragment>
            )}
          </select>

          <label className={style.label}>Ordenar</label>
          <select
            className={style.select}
            name="order"
            onChange={handleOrder}
            defaultValue=""
          >
            <option value="" disabled hidden>
              Orden
            </option>
            <option value="ascendenteAlf">A-Z ⬆</option>
            <option value="descendenteAlf">Z-A ⬇</option>
            <option value="ascendenteHS">Health score ⬆</option>
            <option value="descendenteHS">Health score ⬇</option>
          </select>

          <Link to="/CerateRecipe" className={style.buttoncontainer}>
            <img src={chef} alt="gorro-chef" className={style.controlImg} />
            <h2 className={style.title}>Crea tu propia receta</h2>
            <p className={style.text}>Prueba creando tu propia receta ➜</p>
          </Link>
        </div>
      </aside>

      <article className={style.article}>
        {recipes.length ? (
          <Cards recipes={recipes.slice(firstIndex, lastIndex)}></Cards>
        ) : (
          <div className={style.messageBox}>
            <img src={plato} alt="img" className={style} />

            <h3>
              {" "}
              <span>Ouch!</span> <br></br>
              Buscamos en la cocina, pero no encontramos nada.
            </h3>
          </div>
        )}
      </article>
      {/* 
      <Footer
        recipesPerPage={recipesPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalRecipes={totalRecipes}
      /> */}

      {recipes.length > 0 && (
        <Footer
          recipesPerPage={recipesPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalRecipes={totalRecipes}
        />
      )}
    </div>
  );
};

export default Home;
