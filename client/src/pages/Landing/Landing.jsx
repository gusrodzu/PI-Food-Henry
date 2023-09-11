import { Link } from "react-router-dom";
import style from "./Landing.module.css";


const Landing = () => {
  return (
    <div className={style.container}>
      <div className={style.containertext}>
        <div>
          <div className={style.box}>
            <h2 className={style.title}>Bienvenidos</h2>
            <p className={style.text}>
              Cocina una gran variedad de recetas de cocina con reseñas, fotos y
              calificaciones. Aprende y mejora tus habilidades culinarias con
              las mejores recetas de cocina. Sube tus propias recetas de cocina,
              reseñas y fotos para formar parte de la de esta increible comunidad
            </p>
            <Link to="/home" className={style.buttonblue}>
              ¡Comienza a cocinar!
            </Link>
          </div>
        </div>

        {/* <div className={style.photo}> Hola esta es la imagen </div> */}
        {/* <img src={control} alt="img" className={style.img} /> */}
      </div>
    </div>
  );
};

export default Landing;
