import { FC, useContext, useEffect } from "react";
import Cookies from "js-cookie";
import { useLocation } from "react-router-dom";
import NavBar from "./routes/NavBar";
import Footer from "./Footer";
import Routeur from "./routes/Routeur";
import { ScrollToTop } from "./common/ScrollToTop";
import { AuthContext } from "../context/AuthProvider";

const Main: FC = () => {
  const authContext = useContext(AuthContext);
  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    const accessToken = Cookies.get("access_token");
    const isAdmin = Cookies.get("isAdmin");
    if (accessToken) {
      authContext?.updateLogInState(isAdmin === "true");
    } else if (
      pathname !== "/" &&
      pathname !== "/connexion" &&
      pathname !== "/inscription" &&
      pathname !== "/admin" &&
      pathname !== "/visitor"
    ) {
      authContext?.logOut();
    }
  }, []);

  return (
    <div className="min-h-full">
      <ScrollToTop />
      <NavBar />
      <div className="pb-28">
        <Routeur />
      </div>
      <Footer />
    </div>
  );
};

export default Main;
