import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { privateRoutes, publicRoutes } from "../router/routes";

const AppRouter = () => {
  return (
    // <Routes>
    //   <Route path="" element={<Posts />}></Route>
    //   <Route path="/about" element={<About />}/>
    //   <Route path="/posts" element={<Posts />}/>
    //   <Route path="/error" element={<Error />}/>
    //   <Route path="/posts/:id" element={<PostIdPage />} />
    //   <Route path="*" element={<Navigate to="/error" />} />
    // </Routes>
    <div>
      <Routes>
        {privateRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<route.element />}
            exact={route.exact}
          />
        ))}
      </Routes>
      <Routes>
        {publicRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<route.element />}
            exact={route.exact}
          />
        ))}
      </Routes>
    </div>
  );
};

export default AppRouter;
