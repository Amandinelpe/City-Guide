import { Error404 } from "../components/Error404";
import { Manage } from "../components/admin/Manage";
import { Register } from "../components/authentification/Register";
import { Connexion } from "../components/authentification/Connexion";
import { Explore } from "../components/explore/Explore";
import { HomeVisitor } from "../components/home/HomeVisitor";
import { Home } from "../components/home/Home";

export const routesPath = [
  { path: "/", element: <Home /> },
  { path: "/connexion", element: <Connexion /> },
  { path: "/explore", element: <Explore /> },
  { path: "/visitor", element: <HomeVisitor /> },
  { path: "/inscription", element: <Register /> },
  { path: "/manage", element: <Manage /> },
  { path: "/admin", element: <Connexion admin={true} /> },
  { path: "*", element: <Error404 /> },
];
