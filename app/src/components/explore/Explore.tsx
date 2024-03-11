import { useRef, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import Cookies from "js-cookie";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Rating from "@mui/material/Rating";
import { motion } from "framer-motion";
import { GET_CITIES, GET_PLACES_BY_CITY } from "../../graphql/queries";
import { CREATE_REVIEW } from "../../graphql/mutations";
import { ICity } from "../../models/city.model";
import { Place } from "../../models/place.model";
import { Review } from "../../models/review.model";
import { CitySelection } from "./CitySelection";
import { IGetCity } from "../../models/get-city.model";

const options = {
  zoomControl: false,
  scrollwheel: false,
  draggable: true,
  disableDoubleClickZoom: true,
  streetViewControl: false,
  mapTypeControl: false,
  fullscreenControl: false,
};

export const Explore = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: `AIzaSyAMqxud4Haf1SGmX2O3FyVeRb8qQwuSNCY`,
  });

  const [selectedCity, setSelectedCity] = useState<ICity | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [sectionIndex, setSectionIndex] = useState<number>(0);
  const [reviewComment, setReviewComment] = useState<string>();
  const [reviewRating, setReviewRating] = useState<number | null>(null);

  const placeDetailRef = useRef<HTMLDivElement | null>(null);

  const handleClickShowMore = () => {
    placeDetailRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSelectedPlace = (place: Place | null) => {
    setReviewComment("");
    setReviewRating(null);
    setSelectedPlace(place);
  };

  const handleReviewComment = (e: any) => {
    setReviewComment(e.target.value);
  }

  const handleReviewRating = (e: any, value: number | null) => {
    e.preventDefault();
    setReviewRating(value);
  }

  const [addReview] = useMutation(CREATE_REVIEW, {
    refetchQueries: [
      {
        query: GET_PLACES_BY_CITY,
        variables: { cityId: selectedCity?.id },
      },
    ],
  });

  const handleAddReview = () => {
    addReview({
      variables: {
        input: {
          placeId: selectedPlace?.id,
          userId: Cookies.get("userId"),
          rating: reviewRating,
          comment: reviewComment,
        },
      },
    });
  }

  const { data: getcity } = useQuery<IGetCity>(GET_CITIES);

  const [cityPlaces, setCityPlaces] = useState<Place[] | null>(null);

  const variants = {
    enter: (direction: any) => {
      return {
        x: direction > 0 ? 1000 : -1000,
        opacity: 0,
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: any) => {
      return {
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0,
      };
    },
  };

  useQuery(GET_PLACES_BY_CITY, {
    variables: { cityId: selectedCity?.id },
    skip: !selectedCity?.id,
    onCompleted: (data) => {
      setCityPlaces(data.placesByCity as Place[]);
      if (selectedPlace) {
        handleSelectedPlace(
          data.placesByCity.find(
            (place: Place) => place.id === selectedPlace.id
          )
        );
      }
    },
  });

  return (
    <div className="flex flex-col justify-center items-center gap-10 mt-8 w-full h-auto">
      <div className="flex flex-col gap-4 w-full justify-start items-start px-12">
        <h1 className="text-3xl font-black text-blue">
          Bienvenue dans l'explorateur de villes
        </h1>
        <p className="text-blue text-md">
          Vous pouvez sur cette carte sélectionner une ville, puis explorer les
          points d'intérêts qui s'y trouvent ! &#128512;
        </p>
      </div>
      <motion.div
        className="flex w-full"
        custom={sectionIndex}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{
          x: { type: "spring", stiffness: 300, damping: 30 },
          opacity: { duration: 0.2 },
        }}
        key={sectionIndex}
      >
        {sectionIndex === 0 && (
          <CitySelection
            cities={getcity?.cities as ICity[]}
            selectedCity={selectedCity}
            setSelectedCity={setSelectedCity}
            setSectionIndex={setSectionIndex}
          />
        )}
        {sectionIndex === 1 && (
          <div className="flex flex-col md:flex-row justify-start items-center w-full md:w-full md:h-screen lg:px-12 md:px-4 gap-6">
            <button
              className="flex flex-row items-center justify-center bg-blue text-white rounded-full pl-3 pr-1 py-2 shadow-lg"
              onClick={() => {
                setSectionIndex(0);
              }}
            >
              <ArrowBackIosIcon />
            </button>
            {isLoaded ? (
              <GoogleMap
                mapContainerStyle={{
                  width: "100vw",
                  height: "100vh",
                }}
                center={{
                  lat: selectedCity!.latitude,
                  lng: selectedCity!.longitude,
                }}
                zoom={13}
                options={{
                  ...options,
                  minZoom: 12,
                  maxZoom: 15,
                  zoomControl: true,
                  styles: [
                    {
                      featureType: "poi",
                      stylers: [{ visibility: "off" }],
                    },
                    {
                      featureType: "transit",
                      elementType: "labels.icon",
                      stylers: [{ visibility: "off" }],
                    },
                    {
                      featureType: "road",
                      elementType: "labels.icon",
                      stylers: [{ visibility: "off" }],
                    },
                    {
                      featureType: "administrative.neighborhood",
                      stylers: [{ visibility: "off" }],
                    },
                  ],
                }}
              >
                {cityPlaces?.map((place: Place) => (
                  <Marker
                    key={place.id}
                    position={{ lat: place.latitude, lng: place.longitude }}
                    onMouseOver={() => {
                      handleSelectedPlace(place);
                    }}
                    onClick={() => {
                      handleSelectedPlace(place);
                    }}
                    title={place.name}
                  />
                ))}
                {selectedPlace && (
                  <InfoWindow
                    position={{
                      lat: selectedPlace.latitude,
                      lng: selectedPlace.longitude,
                    }}
                    onCloseClick={() => {
                      handleSelectedPlace(null);
                    }}
                  >
                    <div className="flex flex-col justify-start items-start gap-2">
                      <h2 className="text-black font-medium text-base">
                        {selectedPlace.name}
                      </h2>
                      <Rating
                        name="read-only"
                        value={selectedPlace.averageRating}
                        readOnly
                      />
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
            {selectedPlace && (
              <div
                ref={placeDetailRef}
                className="flex flex-col justify-start items-start gap-6 w-full md:w-3/5 md:p-0 pt-6 px-6"
              >
                <div className="flex flex-col justify-start items-start gap-2 w-full">
                  <h2 className="text-black font-bold text-4xl">
                    {selectedPlace?.name}
                  </h2>
                  <p className="text-black">{selectedPlace?.address}</p>
                  <span
                    className="text-blue cursor-pointer text-lg font-medium underline"
                    onClick={() =>
                      window.open(
                        `https://www.google.com/maps/search/?api=1&query=${selectedPlace?.latitude},${selectedPlace?.longitude}`
                      )
                    }
                  >
                    Voir sur Google Maps
                  </span>
                  <div className="flex flex-row justify-start items-start gap-2 w-full">
                    <Rating
                      name="read-only"
                      value={selectedPlace?.averageRating}
                      readOnly
                    />
                    {selectedPlace?.reviews.length > 0 && (
                      <p>{selectedPlace?.reviews.length} avis</p>
                    )}
                  </div>
                </div>
                <div
                  style={{
                    maxHeight: "300px",
                    overflowY: "auto",
                    width: "100%",
                  }}
                >
                  {selectedPlace?.reviews.map((review: Review) => (
                    <div
                      key={review.id}
                      className="flex flex-col justify-start items-start gap-2 px-4 py-2 border-t border-blue w-full"
                    >
                      <span className="text-black font-medium text-base">
                        {review.user.firstName} {review.user.lastName}
                      </span>
                      <Rating name="read-only" value={review.rating} readOnly />
                      <p className="text-black">{review.comment}</p>
                    </div>
                  ))}
                </div>
                {selectedPlace?.reviews.filter(
                  (review: Review) => review.user.id === Cookies.get("userId")
                ).length === 0 && (
                    <div className="flex flex-col justify-center items-start gap-4 w-full">
                      <textarea
                        className="border-2 border-blue p-2.5 w-4/5 rounded outline-none"
                        placeholder="Votre avis..."
                        value={reviewComment}
                        onChange={handleReviewComment}
                      />
                      <Rating
                        name="simple-controlled"
                        value={reviewRating}
                        onChange={(e, value) => handleReviewRating(e, value)}
                      />
                      <button
                        className={`border w-36 h-10 rounded-lg bg-blue text-white text-lg shadow-lg 
                                  ${!reviewRating ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
                        onClick={handleAddReview}
                        disabled={!reviewRating}
                      >
                        Ajouter
                      </button>
                    </div>
                  )}
              </div>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Explore;
