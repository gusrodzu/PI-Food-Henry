import { Routes, Route } from "react-router-dom";
import Landing from "../pages/Landing/Landing";
import Home from "../pages/Home/Home";
import Detail from "../pages/Detail/Detail";
import Form from "../pages/Form/Form";
import Error from "../pages/Error/Error";

export function MyRoutes({ currentPage, setCurrentPage }) {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route
        path="/home"
        element={
          <Home currentPage={currentPage} setCurrentPage={setCurrentPage} />
        }
      />
      <Route path="/detail/:id" element={<Detail />} />
      <Route path="/ceraterecipe" element={<Form />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
}
