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

const sections = [
  { title: "Catégories", value: Menu.CATEGORIES, element: <ManagePlaceTypes /> },
  { title: "Villes", value: Menu.CITIES, element: <ManageCities /> },
  { title: "Points d'intérêt", value: Menu.PLACES, element: <ManagePlaces /> },
];

export const Manage = () => {
  const [activeMenu, setActiveMenu] = useState<Menu>(Menu.CATEGORIES);

  const handleMenuClick = (menu: Menu) => {
    setActiveMenu(menu);
  };

  return (
    <div>
      <div className="mt-16">
        <div className="h-12 px-12">
          <div className="flex flex-row justify-around border-b-2 border-b-lightGray h-full text-lg">
            {sections.map((section) => (
              <button
                key={section.value}
                onClick={() => handleMenuClick(section.value)}
                className={`${activeMenu === section.value
                  ? "border-b-2 text-blue font-bold border-b-blue"
                  : ""
                  } px-6`}
              >
                {section.title}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8">
          {sections.map((section) => (
            <div
              key={section.value}
              className={`${activeMenu === section.value ? "block" : "hidden"}`}
            >
              {section.element}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
