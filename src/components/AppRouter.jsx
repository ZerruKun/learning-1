import React from "react";
import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from "../context/context";
import { privateRoutes, publicRoutes } from "../router/routes";
import Loader from "./UI/loader/Loader";

const AppRouter = () => {
  const {isAuth, isLoading} = useContext(AuthContext);

  if (isLoading) {
    <Loader />
  }

  return (
    isAuth 
    ? 
      <Routes>
        {privateRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<route.element />}
            exact={route.exact}
          />
        ))}
        <Route path="*" element={<Navigate to="/posts" />} />
      </Routes>
    : 
      <Routes>
        {publicRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<route.element />}
            exact={route.exact}
          />
        ))}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
  );
};

export default AppRouter;
