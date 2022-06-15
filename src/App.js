import React, { useEffect, useState } from "react";
import AppRouter from "./components/AppRouter";
import Navbar from "./components/UI/navbar/Navbar";
import { AuthContext } from "./context/context";

function App() {

  const [isAuth, setIsAuth] = useState(false);

  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    if (localStorage.getItem("auth")) {
      setIsAuth(true);
    }
    setIsLoading(false);
  }, [])

  return (
    <AuthContext.Provider value={{
      isAuth: isAuth,
      setIsAuth: setIsAuth,
      isLoading: isLoading
    }}>
      <Navbar />
      <AppRouter />
    </AuthContext.Provider>
  )
}

export default App;
