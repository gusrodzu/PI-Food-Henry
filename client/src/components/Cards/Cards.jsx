import React from "react";
import Card from "../Card/Card";
import style from "./Cards.module.css";

const Cards = ({ recipes }) => {
  return (
    <div className={style.container}>
      {recipes.map(({ title, image, id, diets, healthScore }, index) => {
        return (
          <Card
            key={index}
            name={title}
            image={image}
            diets={diets}
            healthScore={healthScore} 
            id={id}
          />
        );
      })}
    </div>
  );
};

export default Cards;
