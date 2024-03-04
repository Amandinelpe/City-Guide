import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { ADD_CITY, REMOVE_CITY } from "../../graphql/mutations";
import { GET_CITIES } from "../../graphql/queries";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Box,
  Modal,
  Typography,
} from "@mui/material";
import Autocomplete from "react-google-autocomplete";
import { ICity } from "../../models/city.model";

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

enum UPDATE_MODE {
  ADD,
  EDIT,
}

export const ManageCities = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCity, setSelectedCity] =
    useState<google.maps.places.PlaceResult | null>(null);
  const [cityDescription, setCityDescription] = useState<string>("");
  const [addCity] = useMutation(ADD_CITY, {
    refetchQueries: [{ query: GET_CITIES }],
  });

  const [image, setImage] = useState<File>();
  const [preview, setPreview] = useState("");
  const [updateMode, setUpdateMode] = useState<UPDATE_MODE>(UPDATE_MODE.ADD);

  const [removeCity] = useMutation(REMOVE_CITY, {
    update: (cache, { data }) => {
      const cachedData = cache.readQuery<any>({ query: GET_CITIES });

      if (data?.removeCity) {
        const updatedItems = (cachedData?.cities as ICity[]).filter(
          (city) => city.id !== data.removeCity.id
        );
        cache.writeQuery({ query: GET_CITIES, data: { cities: updatedItems } });
      }
    },
  });

  const handleEditCity = (city: ICity) => {
    setUpdateMode(UPDATE_MODE.EDIT);
    setModalOpen(true);
    setSelectedCity(city);
    setCityDescription(city.description);
    setPreview(`${process.env.REACT_APP_GRAPHQL_URI}/files/${city.image}`);
  };

  const handleAddCity = () => {
    setUpdateMode(UPDATE_MODE.ADD);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setCityDescription("");
    setSelectedCity(null);
    setImage(undefined);
    setPreview("");
  };

  const { data: citiesData } = useQuery(GET_CITIES);

  const cities = citiesData?.cities as ICity[];

  return (
    <div className="flex flex-col pt-6 gap-8 items-start px-12">
      <button
        className="flex flex-row items-center gap-2 bg-blue text-white px-4 py-2 rounded-md"
        onClick={handleAddCity}
      >
        Ajouter une ville
      </button>

      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {updateMode === UPDATE_MODE.ADD
              ? "Ajouter une ville"
              : "Modifier une ville"}
          </Typography>
          <form
            className="flex flex-col gap-6 mt-8"
            onSubmit={(e) => {
              e.preventDefault();

              // update mode

              if (!selectedCity) return;

              if (image) {
                const formData = new FormData();
                formData.append("file", image);

                fetch(`${process.env.REACT_APP_GRAPHQL_URI}/upload/file`, {
                  method: "POST",
                  body: formData,
                })
                  .then((response) => response.json())
                  .then((data) => {
                    const { filename } = data;
                    const cityName =
                      selectedCity?.address_components![0].short_name;
                    const latitude = selectedCity?.geometry?.location?.lat();
                    const longitude = selectedCity?.geometry?.location?.lng();

                    addCity({
                      variables: {
                        input: {
                          name: cityName,
                          description: cityDescription,
                          latitude,
                          longitude,
                          image: filename,
                        },
                      },
                    });
                    handleCloseModal();
                  });
              }
            }}
          >
            {updateMode === UPDATE_MODE.EDIT && (
              <h2 className="text-2xl">{selectedCity?.name}</h2>
            )}
            {updateMode === UPDATE_MODE.ADD && (
              <Autocomplete
                apiKey="AIzaSyAMqxud4Haf1SGmX2O3FyVeRb8qQwuSNCY"
                className="border-2 border-blue p-2.5 w-full rounded outline-none"
                onPlaceSelected={(place: google.maps.places.PlaceResult) => {
                  setSelectedCity(place);
                }}
                options={{
                  types: ["(cities)"],
                  componentRestrictions: { country: "fr" },
                }}
                placeholder="Entrez le nom d'une ville"
              />
            )}
            <textarea
              className="border-2 border-blue p-2.5 w-full h-32 rounded outline-none"
              placeholder="Description de la ville"
              value={cityDescription}
              onChange={(e) => setCityDescription(e.target.value)}
            />
            <div>
              <input
                accept="image/*"
                style={{ display: "none" }}
                id="raised-button-file"
                multiple
                type="file"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    const file = e.target.files[0];
                    setImage(file);
                    setPreview(URL.createObjectURL(file));
                  }
                }}
              />
              <label htmlFor="raised-button-file">
                <Box
                  sx={{
                    border: "2px dashed #BCCCC3",
                    borderRadius: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: 160,
                    cursor: "pointer",
                    backgroundImage: `url(${preview})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  {!preview && (
                    <Typography variant="subtitle1" component="div">
                      Ajouter une image
                    </Typography>
                  )}
                </Box>
              </label>
            </div>
            <div className="flex flex-row gap-8 w-full justify-between">
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
              <TableCell>Latitute</TableCell>
              <TableCell>Longitude</TableCell>
              <TableCell>Image</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cities &&
              [...cities].map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.latitude}</TableCell>
                  <TableCell>{row.longitude}</TableCell>
                  <TableCell>
                    <img
                      src={`${process.env.REACT_APP_GRAPHQL_URI}/files/${row.image}`}
                      alt={row.name}
                      className="w-20 h-18 object-cover"
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-row gap-2 justify-around items-center">
                      <EditIcon
                        onClick={() => handleEditCity(row)}
                        className="text-blue cursor-pointer"
                      />
                      <DeleteIcon
                        className="text-red cursor-pointer"
                        onClick={() => {
                          removeCity({ variables: { input: row.id } });
                        }}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
