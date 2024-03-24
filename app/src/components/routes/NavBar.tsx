import { FC, useContext } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import cityLogo from "../../assets/logo1.png";

const NavBar: FC = () => {
  const location = useLocation();
  const authContext = useContext(AuthContext);

  const handleLogout = () => {
    if (authContext) {
      authContext.logOut();
    }
  };

  return (
    <nav className="h-24 flex items-center w-full justify-between bg-80 px-8 relative md:justify-center md:items-center">
      <div className="absolute flex">
        <NavLink
          to={authContext?.isAdmin ? "/manage" : authContext?.loggedIn ? "/explore" : "/"}
          className="flex justify-center lg:w-56 md:w-52 w-48"
        >
          <img src={cityLogo} alt="logo city" />
        </NavLink>
      </div>
      <div className="flex justify-end items-center w-full">
        {authContext?.loggedIn ? (
          <div className="flex border border-600 border-white w-32 h-8 rounded-lg bg-blue ml-2">
            <button
              onClick={handleLogout}
              className="z-50 text-white text-md w-full flex flex-row gap-1 justify-center items-center font-semibold tracking-wide"
            >
              Déconnexion
            </button>
          </div>
        ) : location.pathname === "/connexion" ||
          location.pathname === "/admin" ? (
          ""
        ) : (
          <div className="flex border border-600 border-white w-28 h-8 rounded-lg bg-blue ml-2">
            <NavLink
              to="/connexion"
              className="z-50 text-white text-md w-full flex flex-row gap-1 justify-center items-center font-semibold tracking-wide"
            >
              Connexion
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
