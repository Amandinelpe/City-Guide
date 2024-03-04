import { FC, useContext, useState } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "../../context/AuthProvider";
import image1 from "../../assets/toulouse_home.webp";
import image2 from "../../assets/Nice_home.jpeg";
import image3 from "../../assets/paris_home.jpeg";
import image4 from "../../assets/patisserie_home.jpeg";
import image5 from "../../assets/restau_home.jpeg";
import fleche from "../../assets/fleche-droite.png";
import { NavLink } from "react-router-dom";
import ImageCaption from "../common/ImageCaption";

export const Home: FC = () => {
  const authContext = useContext(AuthContext);

  const [hoveredImage, setHoveredImage] = useState<number | null>(null);

  return (
    <div className="max-w-screen-xl mx-auto p-8">
      {!authContext?.loggedIn && (
        <>
          <div className="mb-4 flex flex-col gap-6">
            <h1 className="flex flex-col gap-1 tracking-wide lg:text-7xl md:text-6xl text-5xl">
              <span className="text-blue font-bold mt-4">Bienvenue sur</span>
              <span className="text-red font-semibold">City Guide !</span>
            </h1>
            <p className="lg:text-xl md:text-xl text-lg ml-2">
              Trouvez facilement des endroits pour : séjourner, manger,
              magasiner ou visiter.
            </p>
          </div>
          <div className="flex flex-col lg:flex-row gap-5">
            <div className="flex flex-col items-center justify-center gap-5">
              <motion.div
                whileHover={{ scale: 1.1, transition: { duration: 0.5 } }}
                className="relative lg:h-48 lg:ml-24"
              >
                <img
                  src={image1}
                  alt="Paysage"
                  className="object-cover rounded-2xl h-48"
                  onMouseEnter={() => setHoveredImage(1)}
                  onMouseLeave={() => setHoveredImage(null)}
                />
                {hoveredImage === 1 && (
                  <ImageCaption
                    to="/visitor"
                    setHoveredImage={setHoveredImage}
                    index={1}
                  />
                )}
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.1, transition: { duration: 0.5 } }}
                className="relative h-48"
              >
                <img
                  src={image2}
                  alt="Paysage"
                  className="object-cover h-48 rounded-2xl"
                  onMouseEnter={() => setHoveredImage(2)}
                  onMouseLeave={() => setHoveredImage(null)}
                />

                {hoveredImage === 2 && (
                  <ImageCaption
                    to="/visitor"
                    setHoveredImage={setHoveredImage}
                    index={2}
                  />
                )}
              </motion.div>
            </div>
            <div className="flex flex-row items-center justify-center gap-10">
              <div className="flex flex-col items-center justify-center gap-5">
                <motion.div
                  whileHover={{ scale: 1.1, transition: { duration: 0.5 } }}
                  className="relative h-96 w-52 lg:mt-8 lg:ml-28"
                >
                  <img
                    src={image3}
                    alt="Paysage"
                    className="object-cover h-96 w-52 rounded-2xl"
                    onMouseEnter={() => setHoveredImage(3)}
                    onMouseLeave={() => setHoveredImage(null)}
                  />

                  {hoveredImage === 3 && (
                    <ImageCaption
                      to="/visitor"
                      setHoveredImage={setHoveredImage}
                      index={3}
                    />
                  )}
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.1, transition: { duration: 0.5 } }}
                  className="relative h-42 w-52 lg:ml-28 lg:mt-8"
                >
                  <img
                    src={image4}
                    alt="Paysage"
                    className="object-cover h-42 w-52 rounded-2xl"
                    onMouseEnter={() => setHoveredImage(4)}
                    onMouseLeave={() => setHoveredImage(null)}
                  />

                  {hoveredImage === 4 && (
                    <ImageCaption
                      to="/visitor"
                      setHoveredImage={setHoveredImage}
                      index={4}
                    />
                  )}
                </motion.div>
              </div>
              <div className="flex flex-col items-center justify-center gap-5">
                <motion.div
                  whileHover={{ scale: 1.1, transition: { duration: 0.5 } }}
                  className="relative h-96 w-52 lg:mt-10 lg:ml-10"
                >
                  <img
                    src={image5}
                    alt="Paysage"
                    className="object-cover h-96 w-52 rounded-2xl"
                    onMouseEnter={() => setHoveredImage(5)}
                    onMouseLeave={() => setHoveredImage(null)}
                  />

                  {hoveredImage === 5 && (
                    <ImageCaption
                      to="/visitor"
                      setHoveredImage={setHoveredImage}
                      index={5}
                    />
                  )}
                </motion.div>
              </div>
            </div>
          </div>
          <div className="flex w-full justify-center items-center">
            <div className="flex border border-600 border-white w-44 h-16 rounded-lg bg-red ml-2 mt-16">
              <NavLink
                to="/visitor"
                className="text-white text-xl w-full flex flex-row gap-1 justify-center items-center font-semibold tracking-wide"
              >
                Découvrir
                <img
                  src={fleche}
                  alt="discover"
                  className="h-6 w-8 flex ml-4 mt-1 animate-bounce"
                />
              </NavLink>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
