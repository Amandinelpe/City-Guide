import { useMemo } from "react";
import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { AgGridReact } from 'ag-grid-react';
import { ColDef } from 'ag-grid-community';
import Autocomplete from "react-google-autocomplete";
import { Modal, Typography, Button, Box } from "@mui/material";
import { useSnackbar } from 'notistack';
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

import CustomFloatingButton from "../common/CustomFloatingButton";
import ImageCellRenderer from "../common/ImageCellRenderer";
import { ADD_CITY, REMOVE_CITY, UPDATE_CITY } from "../../graphql/mutations";
import { GET_CITIES } from "../../graphql/queries";
import { ICity } from "../../models/city.model";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #BCCCC3",
  boxShadow: 24,
  p: 4,
  borderRadius: 4,
};

export const ManageCities = () => {
  const { enqueueSnackbar } = useSnackbar();

  const defaultColDef = useMemo(() => {
    return {
      editable: true,
    };
  }, []);

  const columnDefs: ColDef[] = [
    { field: "name", headerName: "Nom", editable: false, width: 200, sort: 'asc' },
    {
      field: "description",
      headerName: "Description",
      cellEditor: 'agLargeTextCellEditor',
      cellEditorPopup: true,
      cellEditorParams: {
        rows: 15,
        cols: 50,
        maxLength: 1000,
      },
      width: 600,
      cellStyle: { cursor: "pointer" },
    },
    {
      field: "image",
      headerName: "Image",
      width: 230,
      cellRenderer: (params: any) => {
        return (
          <ImageCellRenderer src={params.value as string} data={params.data} handleFileChange={handleCityFileChange} />
        );
      },
      editable: false,
    },
    {
      headerName: "Actions",
      width: 100,
      editable: false,
      cellRenderer: (params: any) => {
        return (
          <div className="flex flex-row h-full w-full justify-center items-center">
            <DeleteIcon
              className="text-red cursor-pointer"
              onClick={() => {
                removeCity({ variables: { input: params.data.id } });
              }}
            />
          </div>
        );
      }
    }
  ];

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCity, setSelectedCity] =
    useState<google.maps.places.PlaceResult | null>(null);
  const [cityDescription, setCityDescription] = useState<string>("");
  const [addCity] = useMutation(ADD_CITY, {
    refetchQueries: [{ query: GET_CITIES }],
  });
  const [updateCity] = useMutation(UPDATE_CITY, {
    onCompleted: () => {
      enqueueSnackbar('Modification enregistrée avec succès !', { variant: 'success', autoHideDuration: 3000 });
    },
    onError: (error) => {
      enqueueSnackbar(`Erreur lors de la modification : ${error.message}`, { variant: 'error', autoHideDuration: 3000 });
    },
    refetchQueries: [{ query: GET_CITIES }],
  });

  const [image, setImage] = useState<File>();
  const [preview, setPreview] = useState("");

  const handleCellValueChanged = async (event: any) => {
    const { data, colDef, newValue, oldValue } = event;
    if (newValue !== oldValue) {
      try {
        await updateCity({
          variables: {
            input: {
              id: data.id,
              description: colDef.field === 'description' ? newValue : data.description,
              image: data.image,
            },
          },
        });
      } catch (error: any) {
        enqueueSnackbar(`Erreur lors de la modification : ${error.message}`, { variant: 'error', autoHideDuration: 3000 });
      }
    }
  };

  const handleCityFileChange = (data: ICity, fileName: string) => {
    updateCity({
      variables: {
        input: {
          id: data.id,
          description: data.description,
          image: fileName,
        },
      },
    });
  };

  const [removeCity] = useMutation(REMOVE_CITY, {
    onCompleted: () => {
      enqueueSnackbar('Ville supprimée avec succès !', { variant: 'success', autoHideDuration: 3000 });
    },
    onError: (error) => {
      enqueueSnackbar(`Erreur lors de la suppression : ${error.message}`, { variant: 'error', autoHideDuration: 3000 });
    },
    refetchQueries: [{ query: GET_CITIES }],
  });

  const handleAddCity = () => {
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
  const cities = useMemo(() => {
    return citiesData?.cities.map((pt: ICity) => ({ ...pt })) || [];
  }, [citiesData]);

  return (
    <div className="flex flex-col pt-6 gap-8 items-start px-12">
      <div className="w-full flex flex-col justify-center items-center gap-8">
        <CustomFloatingButton icon={<AddIcon />} handlerButtonAction={handleAddCity} />
        <div
          className="ag-theme-quartz"
          style={{ width: '80%', height: '500px' }}
        >
          <AgGridReact
            rowData={cities}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            rowHeight={100}
            onCellValueChanged={handleCellValueChanged}
            singleClickEdit={true}
          />
        </div>
      </div>

      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Ajouter une ville
          </Typography>
          <form
            className="flex flex-col gap-6 mt-8"
            onSubmit={(e) => {
              e.preventDefault();
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
    </div>
  );
};
