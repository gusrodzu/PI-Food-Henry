import React, { useEffect, useState } from "react";
import style from "./SearchBar.module.css";
import { useDispatch } from "react-redux";
import { searchRecipe } from "../../Redux/actions";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  const handleChange = (event) => {
    const value = event.target.value;
    setSearch(value);
  
  };

  useEffect(() => {
    const searchTimeout = setTimeout(() => {
      dispatch(searchRecipe(search));
    }, 500); 
    return () => clearTimeout(searchTimeout);
  }, [search, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(searchRecipe(search));
  };

  return (
    <div className={style.search}>
      <input
        type="text"
        placeholder="Busca una receta"
        value={search}
        onChange={handleChange}
        className={style.searchinput}
      />
      <button
        type="submit"
        onClick={handleSubmit}
        className={style.searchbutton}
      >
        Buscar
      </button>
    </div>
  );
};

export default SearchBar;
