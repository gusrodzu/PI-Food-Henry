
import style from "./Landing.module.css";
import Footer from "../../components/Footer/Footer";

const Landing = () => {
  return (
    <div className={style.container}>
      <div className={style.containertext}>
        <div>
          <div className={style.box}>
            <h2 className={style.title}>
              Las buenas elecciones de alimentos son buenas inversiones.
            </h2>
            <p className={style.text}>
              Descubre un mundo de sabores y experiencias culinarias en nuestra
              plataforma. Aquí, podrás explorar una amplia gama de recetas de
              cocina, acompañadas de reseñas, fotografías y calificaciones que
              te ayudarán a encontrar la inspiración perfecta para tu próxima
              comida. ¡Mejora tus habilidades culinarias con nuestras destacadas
              recetas y consejos!
            </p>

            <p className={style.text}>
              Además, tú también puedes ser parte de esta increíble comunidad
              culinaria. Comparte tus propias recetas de cocina, deja tus
              reseñas y muestra tus habilidades fotográficas para inspirar a
              otros amantes de la cocina. Únete a nosotros en este emocionante
              viaje gastronómico y forma parte de una comunidad apasionada por
              la buena comida y la cocina creativa
            </p>
            <button
              className={style.button}
              onClick={() => (window.location.href = "../Home")}
            >
              ¡Comienza ahora!
            </button>
          </div>
        </div>
        
      </div>
      
    </div>
    
  );
};

export default Landing;
