import style from "./Error.module.css";
import huevo from "../../assets/broken-egg.png";

const Error = () => {
  return (
    <div className={style.container}>
      <h1 className={style.title}>Error (404) </h1>
      <br></br>
      <h3> No hemos podido encontrar la página que estás buscando.</h3>
      <br></br>
      <p>No te preocupes, puedes seguir explorando nuestras recetas. Simplemente regresa a la <a href="../Home">página de inicio</a>.</p>

      <img src={huevo} alt="img" className={style} /> 
    </div>
  );
};

export default Error;
