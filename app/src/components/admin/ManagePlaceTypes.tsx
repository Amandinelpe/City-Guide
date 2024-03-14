import { useMemo } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { AgGridReact } from 'ag-grid-react';
import { ColDef } from 'ag-grid-community';
import { useSnackbar } from 'notistack';

import { GET_PLACE_TYPES } from "../../graphql/queries";
import { UPDATE_PLACETYPE } from "../../graphql/mutations";
import { PlaceType } from "../../models/place-type.model";

export const ManagePlaceTypes = () => {
  const { enqueueSnackbar } = useSnackbar();

  const defaultColDef = useMemo(() => {
    return {
      editable: true,
    };
  }, []);

  const colDefs: ColDef[] = [
    { field: "googlePlaceTypeName", headerName: "Référence Google Places", editable: false, width: 320 },
    {
      field: "name", headerName: "Nom", width: 380, sort: 'asc', cellEditor: 'agTextCellEditor',
      cellEditorParams: {
        maxLength: 100,
      },
    },
    {
      field: "activated",
      headerName: "Actif",
      width: 100,
      cellRenderer: 'agCheckboxCellRenderer',
      cellRendererParams: {
        disabled: false,
      },
      suppressKeyboardEvent: (params) => params.event.key === ' ',
    },
  ];

  const { data: placeTypesData } = useQuery(GET_PLACE_TYPES);
  const placeTypes = useMemo(() => {
    return placeTypesData?.placeTypes.map((pt: PlaceType) => ({ ...pt })) || [];
  }, [placeTypesData]);

  const [updatePlaceType] = useMutation(UPDATE_PLACETYPE, {
    onCompleted: () => {
      enqueueSnackbar('Modification enregistrée avec succès !', { variant: 'success', autoHideDuration: 3000 });
    },
    onError: (error) => {
      enqueueSnackbar(`Erreur lors de la modification : ${error.message}`, { variant: 'error', autoHideDuration: 3000 });
    }
  });

  const handleCellValueChanged = async (event: any) => {
    const { data, colDef, newValue, oldValue } = event;
    if (newValue !== oldValue) {
      try {
        await updatePlaceType({
          variables: {
            input: {
              id: data.id,
              name: colDef.field === 'name' ? newValue : data.name,
              activated: colDef.field === 'activated' ? newValue : data.activated,
            },
          },
        });
      } catch (error) {
      }
    }
  };

  return (
    <div className="flex flex-col pt-6 gap-8 items-start px-12">
      <div className="w-full flex justify-center items-center">
        <div
          className="ag-theme-quartz"
          style={{ width: '58%', height: '500px' }}
        >
          <AgGridReact
            rowData={placeTypes}
            columnDefs={colDefs}
            defaultColDef={defaultColDef}
            onCellValueChanged={handleCellValueChanged}
            singleClickEdit={true}
          />
        </div>
      </div>
    </div>
  );
};
