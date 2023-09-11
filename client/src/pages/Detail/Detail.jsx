import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { addRecipeDetail, cleanDetail } from "../../Redux/actions";

import style from "./Detail.module.css";

const Detail = () => {
  const { recipeDetail } = useSelector((state) => state);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addRecipeDetail(id));
    return () => {
      dispatch(cleanDetail());
    };
  }, [id, dispatch]);

  return (
    <div className={style.container}>
      <div
        className={style.cover}
        style={{ backgroundImage: `url(${recipeDetail?.image})` }}
      ></div>

      {recipeDetail.id == id ? (
        <div className={style.containertext}>

          <div className={style.text}>
            <div className={style.description}>
              <h2 className={style.name}>{recipeDetail.title}</h2>

              {isNaN(id) ? (
                <p>{recipeDetail.description}</p>
              ) : (
                <div
                  dangerouslySetInnerHTML={{
                    __html: recipeDetail?.description,
                  }}
                ></div>
              )}
             

              <div className={style.lowerinfo}>
                <h2 className={style.subTitle}>Descipción</h2>
                <p className={style.text}>
                  {recipeDetail.summary.replace(/<[^>]*>/g, "")}
                </p>

                <h2 className={style.subTitle}>Instruciones</h2>
                <p className={style.text}>
                  {recipeDetail.instructions.replace(/<[^>]*>/g, "")}
                </p>

                <h2>Tipo de dieta:</h2>

                <ul className={style.dietList}>
                  {recipeDetail.diets.map((element) => (
                    <li key={element.id}>
                      {element.name.toUpperCase()}
                    </li>
                  ))}
                </ul>
                <h2>Score: {recipeDetail.healthScore}</h2>

                <Link to="/home" className={style.buttonblue}>
                  Regresar
                </Link>
              </div>
            </div>
          </div>

          <div className={style.photo}>
            <img src={recipeDetail?.image} alt="" className={style.img} />
          </div>


        </div>
      ) : (
        <div className={style.loadingcontainer}>
          <div className={style.loader}>
            <div className={style.loaderAnimacion}></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Detail;
