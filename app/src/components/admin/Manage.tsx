import { useState } from "react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { ManagePlaceTypes } from "./ManagePlaceTypes";
import { ManageCities } from "./ManageCities";
import { ManagePlaces } from "./ManagePlaces";
import "./table-style.css";

enum Menu {
  CATEGORIES = "categories",
  CITIES = "cities",
  PLACES = "places",
}

export const Manage = () => {
  const [activeMenu, setActiveMenu] = useState(Menu.CATEGORIES);

  const handleMenuClick = (menu: Menu) => {
    setActiveMenu(menu);
  };

  return (
    <div>
      <div className="mt-16">
        <div className="h-12 px-12">
          <div className="flex flex-row justify-around border-b-2 border-b-lightGray h-full text-lg">
            <button
              onClick={() => handleMenuClick(Menu.CATEGORIES)}
              className={`${activeMenu === Menu.CATEGORIES
                ? "border-b-2 text-blue font-bold border-b-blue"
                : ""
                } px-6`}
            >
              Catégories
            </button>
            <button
              onClick={() => handleMenuClick(Menu.CITIES)}
              className={`${activeMenu === Menu.CITIES
                ? "border-b-2 text-blue font-bold border-b-blue"
                : ""
                } px-6`}
            >
              Villes
            </button>
            <button
              onClick={() => handleMenuClick(Menu.PLACES)}
              className={`${activeMenu === Menu.PLACES
                ? "border-b-2 text-blue font-bold border-b-blue"
                : ""
                } px-6`}
            >
              Points d'intérêt
            </button>
          </div>
        </div>

        <div className="mt-8">
          {activeMenu === Menu.CATEGORIES && <ManagePlaceTypes />}
          {activeMenu === Menu.CITIES && <ManageCities />}
          {activeMenu === Menu.PLACES && <ManagePlaces />}
        </div>
      </div>
    </div>
  );
};
