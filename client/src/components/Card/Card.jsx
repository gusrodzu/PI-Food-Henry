import React from "react";
import style from "./Card.module.css";
import { Link } from "react-router-dom";

const Card = ({ name, image, id, healthScore, diets }) => {
  const dietsNames = Array.isArray(diets)
    ? diets.map((elemet) => elemet.name).join(", ")
    : diets;

  return (
    <div className={style.card}>
      {/* <p className={style.diets}>

        <ul className={style.dietList}>
          {Array.isArray(diets) ? (
            diets.map((elemet, index) => <li key={index}>{elemet.name}</li>)
          ) : (
            <li>{diets}</li>
          )}
        </ul>
      </p> */}

      <img src={image} alt={name} className={style.image} />

      <div className={style.overlay}>
        <div className={style.cardinfo}>
          <Link to={`/detail/${id}`} className={style.link}>
            <h3 className={style.name}>{name}</h3>
          </Link>

          <p className={style.healthScore}>Puntuacón: {healthScore}</p>
        </div>

        <ul className={style.dietList}>
          {Array.isArray(diets) ? (
            diets.map((elemet, index) => <li key={index}>{elemet.name}</li>)
          ) : (
            <li>{diets}</li>
          )}
        </ul>
      
      </div>
    </div>
  );
};

export default Card;
