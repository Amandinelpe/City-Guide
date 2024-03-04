import { useState } from "react";
import AutoComplete from "@mui/material/Autocomplete";
import { useQuery, useMutation } from "@apollo/client";
import { GET_PLACE_TYPES } from "../../graphql/queries";
import {
  Box,
  Button,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { UPDATE_PLACETYPE } from "../../graphql/mutations";
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

export const ManagePlaceTypes = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlaceType, setSelectedPlaceType] = useState<PlaceType | null>(
    null
  );
  const [updatePlaceType] = useMutation(UPDATE_PLACETYPE, {
    refetchQueries: [{ query: GET_PLACE_TYPES }],
  });

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const { loading, data: placeTypesData } = useQuery(GET_PLACE_TYPES);

  const placeTypes = placeTypesData?.placeTypes as PlaceType[];

  return (
    <div className="flex flex-col pt-6 gap-8 items-start px-12">
      <button
        className="flex flex-row items-center gap-2 bg-blue text-white px-4 py-2 rounded-md"
        onClick={handleOpenModal}
      >
        Ajouter une catégorie
      </button>

      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Ajouter une catégorie
          </Typography>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              updatePlaceType({
                variables: {
                  input: {
                    id: selectedPlaceType?.id,
                    activated: true,
                  },
                },
              });
              handleCloseModal();
            }}
          >
            {!loading && (
              <AutoComplete
                className="mt-8 w-full"
                disablePortal
                id="combo-box-demo"
                options={placeTypes
                  ?.filter((placeType) => !placeType.activated)
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
                  const selectedPlaceType = placeTypes?.filter(
                    (placeType) => placeType.name === value
                  )[0];
                  setSelectedPlaceType(selectedPlaceType);
                }}
              />
            )}
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
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {placeTypes &&
              [...placeTypes]
                .filter((placeType) => placeType.activated)
                .map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>
                      <Button
                        color="error"
                        onClick={() => {
                          updatePlaceType({
                            variables: {
                              input: {
                                id: row.id,
                                activated: false,
                              },
                            },
                          });
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
