import React from "react";
import Pagination from "../../components/Pagination/Pagination";
import style from "./Footer.module.css";



const Footer = ({
  recipesPerPage,
  currentPage,
  setCurrentPage,
  totalRecipes,
}) => {
  return (
    <footer>
      <Pagination
        recipesPerPage={recipesPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalRecipes={totalRecipes}
      />

      <div className={style.container}>
        <h4>
        Diseñado por: <a href="https://github.com/gusrodzu" target="_blank">Gustavo Rodriguez</a>
        </h4>
      </div>
    </footer>
  );
};

export default Footer;
