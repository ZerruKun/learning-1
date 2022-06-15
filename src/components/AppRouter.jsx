import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { privateRoutes, publicRoutes } from "../router/routes";

const AppRouter = () => {
  const isAuth = true;
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
