import { FC, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import fleche from "../../assets/fleche-droite.png";
import picture1 from "../../assets/restaurantbis_home.jpeg";
import picture2 from "../../assets/hotel_home.jpeg";
import picture3 from "../../assets/museum_home.jpeg";
import picture4 from "../../assets/parc_home.jpeg";
import picture5 from "../../assets/randonnee_home_visiteur.jpeg";
import picture6 from "../../assets/foire_home.jpeg";
import picture7 from "../../assets/paris_home.jpeg";
import picture8 from "../../assets/patisserie_home.jpeg";
import picture9 from "../../assets/cafe_home.jpeg";
import picture10 from "../../assets/restau_home.jpeg";
import picture11 from "../../assets/fontaine_marseille.jpeg";
import picture12 from "../../assets/pantheon_home.jpeg";
import { Reveal } from "../common/Reveal";

export const HomeVisitor: FC = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const handleImageLoad = () => {
      setImageLoaded(true);
    };

    const imageElement = document.getElementById("slideInImage");
    if (imageElement) {
      imageElement.addEventListener("load", handleImageLoad);
    }

    return () => {
      if (imageElement) {
        imageElement.removeEventListener("load", handleImageLoad);
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="max-w-screen-xl mx-auto p-8 flex flex-col lg:flex-row justify-center items-center">
        <div className="flex flex-row">
          <div className="mb-4 flex flex-col gap-6">
            <Reveal
              children={
                <img
                  src={picture1}
                  alt="Paysage"
                  className="object-cover rounded-2xl h-68 w-56 ml-8"
                />
              }
            ></Reveal>
            <Reveal
              children={
                <img
                  src={picture2}
                  alt="Paysage"
                  className="object-cover rounded-2xl h-48 w-72 mr-6 ml-8 mt-8"
                />
              }
            ></Reveal>
            <Reveal
              children={
                <img
                  src={picture3}
                  alt="Paysage"
                  className="object-cover rounded-2xl h-48 w-60 mt-8"
                />
              }
            ></Reveal>
          </div>
          <div className="mb-4 flex flex-col gap-6 ml-4 mt-8">
            <Reveal
              children={
                <img
                  src={picture4}
                  alt="Paysage"
                  className="object-cover rounded-2xl h-56 w-56 mr-8"
                />
              }
            ></Reveal>
            <Reveal
              children={
                <img
                  src={picture5}
                  alt="Paysage"
                  className="object-cover rounded-2xl h-56 w-56 ml-4 mt-10"
                />
              }
            ></Reveal>
            <Reveal
              children={
                <img
                  src={picture6}
                  alt="Paysage"
                  className="object-cover rounded-2xl h-68 w-56 mr-6 mt-8"
                />
              }
            ></Reveal>
          </div>
        </div>
        <div className="flex flex-row">
          <div className="mb-4 flex flex-col gap-6 ml-4">
            <Reveal
              children={
                <img
                  src={picture7}
                  alt="Paysage"
                  className="object-cover rounded-2xl h-96 w-56 ml-8"
                />
              }
            ></Reveal>
            <Reveal
              children={
                <img
                  src={picture8}
                  alt="Paysage"
                  className="object-cover rounded-2xl h-56 w-56 mt-10"
                />
              }
            ></Reveal>
            <Reveal
              children={
                <img
                  src={picture9}
                  alt="Paysage"
                  className="object-cover rounded-2xl h-56 w-56 ml-8 mt-10"
                />
              }
            ></Reveal>
          </div>
          <div className="mb-4 flex flex-col gap-6 ml-4">
            <Reveal
              children={
                <img
                  src={picture10}
                  alt="Paysage"
                  className="object-cover rounded-2xl h-96 w-56 ml-14 mt-12"
                />
              }
            ></Reveal>
            <Reveal
              children={
                <img
                  src={picture11}
                  alt="Paysage"
                  className="object-cover rounded-2xl h-68 w-72 ml-4 mt-10"
                />
              }
            ></Reveal>
            <Reveal
              children={
                <img
                  src={picture12}
                  alt="Paysage"
                  className="object-cover rounded-2xl h-68 w-72 ml-12 mt-10"
                />
              }
            ></Reveal>
          </div>
        </div>
      </div>

      <div className="flex flex-row w-full items-start justify-start pl-8">
        <div className="flex border border-600 border-white w-44 h-16 rounded-lg bg-red ml-2">
          <NavLink
            to="/connexion"
            className="text-white text-xl w-full flex flex-row gap-1 justify-center items-center font-semibold tracking-wide"
          >
            Connexion
            <img
              src={fleche}
              alt="discover"
              className="h-6 w-8 flex ml-4 mt-1 animate-bounce"
            />
          </NavLink>
        </div>
      </div>
    </div>
  );
};
