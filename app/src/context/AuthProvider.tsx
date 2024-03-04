import React, { FC, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { IAuth } from "./IAuth";
import Cookies from "js-cookie";

export const AuthContext = React.createContext<IAuth | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const navigate = useNavigate();

  const [auth, setAuth] = useState({
    userFirstName: "",
    userLastName: "",
    loggedIn: false,
    isAdmin: false,
  });

  const logIn = () => {
    setAuth((prevState) => ({
      ...prevState,
      loggedIn: true,
      isAdmin: false,
    }));

    navigate("explore");
  };

  const updateLogInState = (isAdmin: boolean) => {
    setAuth((prevState) => ({
      ...prevState,
      loggedIn: true,
      isAdmin: isAdmin,
    }));

    if (isAdmin) navigate("manage");
    else navigate("explore");
  };

  const logInAdmin = () => {
    setAuth((prevState) => ({
      ...prevState,
      loggedIn: true,
      isAdmin: true,
    }));

    navigate("manage");
  };

  const logOut = () => {
    setAuth((prevState) => ({
      ...prevState,
      loggedIn: false,
    }));
    Cookies.remove("access_token");
    Cookies.remove("isAdmin");
    Cookies.remove("userId");
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        ...auth,
        logIn,
        logInAdmin,
        logOut,
        updateLogInState
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
