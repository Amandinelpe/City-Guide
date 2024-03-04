import { Routes, Route } from "react-router-dom";
import { routesPath } from "../../utils/path";

const Routeur = () => {
    return (
        <Routes>
            {routesPath.map((e: any, i: any) => {
                return <Route key={i} path={e.path} element={e.element} />;
            })}
        </Routes>
    );
};
export default Routeur;