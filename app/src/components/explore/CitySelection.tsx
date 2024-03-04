import { useRef, useState } from "react";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useJsApiLoader,
} from "@react-google-maps/api";
import { motion } from "framer-motion";
import { ICity } from "../../models/city.model";
import { CityDescription } from "../../models/city-description.model";
import CityDetails from "./CityDetails";

interface Props {
  cities: ICity[];
  selectedCity: ICity | null;
  setSelectedCity: (city: ICity | null) => void;
  setSectionIndex: (index: number) => void;
}

const FranceDescription: CityDescription = {
  name: "France",
  description:
    "La France, compte des villages alpins et des plages. Paris, sa capitale, est célèbre pour ses maisons de mode, ses musées d'art classique. Le pays est également réputé pour ses vins et sa cuisine raffinée. Les peintures rupestres des grottes de Lascaux, le théâtre romain de Lyon et l'immense château de Versailles témoignent de sa riche histoire.",
  image:
    "https://www.chateauversailles.fr/sites/default/files/styles/reseaux_sociaux/public/visuels_principaux/chateau-home.jpg?itok=ZicY5bTj",
};

const options = {
  minZoom: 6,
  maxZoom: 10,
  zoomControl: true,
  scrollwheel: false,
  draggable: true,
  disableDoubleClickZoom: true,
  streetViewControl: false,
  mapTypeControl: false,
  fullscreenControl: false,
};

export const CitySelection: React.FC<Props> = ({
  cities,
  selectedCity,
  setSelectedCity,
  setSectionIndex,
}) => {
  const cityDetailRef = useRef<HTMLDivElement | null>(null);

  const handleClickShowMore = () => {
    cityDetailRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyAMqxud4Haf1SGmX2O3FyVeRb8qQwuSNCY",
  });

  const [cityDescription, setCityDescription] =
    useState<CityDescription>(FranceDescription);

  return (
    <div className="flex md:flex-row flex-col justify-between items-start w-screen md:w-full md:h-screen lg:px-12 md:px-4 gap-6">
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={{
            width: "100vw",
            height: "100vh",
          }}
          center={{ lat: 46.5349019, lng: 2.209666999999996 }}
          zoom={5}
          options={options}
        >
          {cities?.map((city: ICity) => (
            <Marker
              key={city.id}
              position={{ lat: city.latitude, lng: city.longitude }}
              onMouseOver={() => {
                setSelectedCity(city);
                setCityDescription({
                  name: city.name,
                  description: city.description,
                  image:
                    city.image &&
                    `${process.env.REACT_APP_GRAPHQL_URI}/files/${city.image}`,
                });
              }}
              onClick={() => {
                setSelectedCity(city);
                setCityDescription({
                  name: city.name,
                  description: city.description,
                  image:
                    city.image &&
                    `${process.env.REACT_APP_GRAPHQL_URI}/files/${city.image}`,
                });
              }}
            />
          ))}
          {selectedCity && (
            <InfoWindow
              position={{
                lat: selectedCity.latitude,
                lng: selectedCity.longitude,
              }}
              onCloseClick={() => {
                setSelectedCity(null);
                setCityDescription(FranceDescription);
              }}
            >
              <div className="flex flex-col justify-center items-center gap-2">
                <h2 className="text-black font-medium text-md">
                  {selectedCity.name}
                </h2>
                <span
                  className="block md:hidden decoration-solid"
                  onClick={handleClickShowMore}
                >
                  En savoir plus
                </span>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      ) : (
        <></>
      )}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        ref={cityDetailRef}
        className="flex flex-col justify-start items-start w-full md:w-3/5 md:px-0 px-8"
      >
        <CityDetails
          selectedCity={selectedCity}
          cityDescription={cityDescription}
          setSectionIndex={setSectionIndex}
        />
      </motion.div>
    </div>
  );
};
