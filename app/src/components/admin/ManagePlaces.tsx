import { useState } from "react";
import { ADD_PLACE, REMOVE_PLACE } from "../../graphql/mutations";
import { GET_CITIES, GET_PLACES, GET_PLACE_TYPES } from "../../graphql/queries";
import { useMutation, useQuery } from "@apollo/client";
import {
  Modal,
  Box,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import Autocomplete from "react-google-autocomplete";
import AutoComplete from "@mui/material/Autocomplete";
import { Place } from "../../models/place.model";
import { ICity } from "../../models/city.model";
import { PlaceType } from "../../models/place-type.model";

const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #BCCCC3",
  boxShadow: 24,
  p: 4,
};

export const ManagePlaces = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlace, setSelectedPlace] =
    useState<google.maps.places.PlaceResult | null>(null);
  const [selectedPlaceType, setSelectedPlaceType] = useState<PlaceType | null>(
    null
  );
  const [selectedCity, setSelectedCity] = useState<ICity | null>(null);
  const [addPlace] = useMutation(ADD_PLACE, {
    refetchQueries: [{ query: GET_PLACES }],
  });

  const [removePlace] = useMutation(REMOVE_PLACE, {
    update: (cache, { data }) => {
      const cachedData = cache.readQuery<any>({ query: GET_PLACES });

      if (data?.removePlace && cachedData?.places) {
        const updatedItems = (cachedData?.places as ICity[]).filter(
          (place) => place.id !== data.removePlace.id
        );
        cache.writeQuery({ query: GET_PLACES, data: { places: updatedItems } });
      }
    },
  });

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const { loading: loadingPlaces, data: placesData } = useQuery(GET_PLACES);
  const { loading: loadingCities, data: citiesData } = useQuery(GET_CITIES);
  const { loading: loadingPlaceTypes, data: placeTypesData } =
    useQuery(GET_PLACE_TYPES);

  const cities = citiesData?.cities as ICity[];
  const places = placesData?.places as Place[];
  const placeTypes = placeTypesData?.placeTypes as PlaceType[];

  return (
    <div className="flex flex-col pt-6 gap-8 items-start px-12">
      <button
        className="flex flex-row items-center gap-2 bg-blue text-white px-4 py-2 rounded-md"
        onClick={handleOpenModal}
      >
        Ajouter un point d'intérêt
      </button>

      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Ajouter un point d'intérêt
          </Typography>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!selectedPlace) return;

              const placeName = selectedPlace?.name;
              const latitude = selectedPlace?.geometry?.location?.lat();
              const longitude = selectedPlace?.geometry?.location?.lng();

              const streetNumber =
                selectedPlace?.address_components?.find((component) =>
                  component.types.includes("street_number")
                )?.long_name || "";
              const route =
                selectedPlace?.address_components?.find((component) =>
                  component.types.includes("route")
                )?.long_name || "";
              const locality =
                selectedPlace?.address_components?.find((component) =>
                  component.types.includes("locality")
                )?.long_name || "";
              const postalCode =
                selectedPlace?.address_components?.find((component) =>
                  component.types.includes("postal_code")
                )?.long_name || "";

              const address = `${streetNumber} ${route}, ${postalCode} ${locality}`;

              addPlace({
                variables: {
                  input: {
                    name: placeName,
                    latitude: latitude,
                    longitude: longitude,
                    address: address,
                    placeTypeId: selectedPlaceType?.id,
                    cityId: selectedCity?.id,
                  },
                },
              });
              handleCloseModal();
            }}
          >
            {!loadingPlaceTypes && (
              <AutoComplete
                className="mt-8 w-full"
                disablePortal
                id="combo-box-demo"
                options={placeTypes
                  ?.filter((placeType) => placeType.activated)
                  ?.map((placeType) => placeType.name)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    key={params.id}
                    id={params.id}
                    label="Catégorie"
                  />
                )}
                onChange={(event, value) => {
                  event.preventDefault();
                  const selectedPlaceType = placeTypes?.filter(
                    (placeType) => placeType.name === value
                  )[0];
                  setSelectedPlaceType(selectedPlaceType);
                }}
              />
            )}
            {!loadingCities && (
              <AutoComplete
                className="mt-8 w-full"
                disablePortal
                id="combo-box-demo"
                options={cities?.map((city) => city.name)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    key={params.id}
                    id={params.id}
                    label="Ville"
                  />
                )}
                onChange={(event, value) => {
                  event.preventDefault();
                  const selectedCity = cities?.filter(
                    (city) => city.name === value
                  )[0];
                  setSelectedCity(selectedCity);
                }}
              />
            )}
            <Autocomplete
              apiKey="AIzaSyAMqxud4Haf1SGmX2O3FyVeRb8qQwuSNCY"
              className="border-2 border-blue p-2.5 w-full rounded outline-none mt-8"
              onPlaceSelected={(place: google.maps.places.PlaceResult) => {
                setSelectedPlace(place);
              }}
              options={{
                types: ["establishment"],
                componentRestrictions: { country: "fr" },
                fields: ["name", "geometry", "address_components"],
              }}
              placeholder="Point d'intérêt"
            />
            <div className="mt-8 flex flex-row gap-8 w-full justify-between">
              <Button variant="contained" color="success" type="submit">
                Valider
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={handleCloseModal}
              >
                Annuler
              </Button>
            </div>
          </form>
        </Box>
      </Modal>

      <TableContainer component={Paper} className="w-full">
        <Table
          sx={{ minWidth: 650 }}
          aria-label="simple table"
          className="w-full rounded-md"
        >
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Nom</TableCell>
              <TableCell>Adresse</TableCell>
              <TableCell>Catégorie</TableCell>
              <TableCell>Ville</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!loadingPlaces &&
              places &&
              [...places].map((place) => (
                <TableRow
                  key={place.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {place.id}
                  </TableCell>
                  <TableCell>{place.name}</TableCell>
                  <TableCell>{place.address}</TableCell>
                  <TableCell>{place.placeType.name}</TableCell>
                  <TableCell>{place.city.name}</TableCell>
                  <TableCell>
                    <Button
                      color="error"
                      onClick={() => {
                        removePlace({ variables: { input: place.id } });
                      }}
                    >
                      Supprimer
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
