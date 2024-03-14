import { Box, Button, Typography } from "@mui/material";
import exp from "constants";
import { ChangeEvent, useState } from "react";

type ImageCellEditorProps = {
  value: string;
  onValueChange: (value: string) => void;
  stopEditing: () => void;
};

const ImageCellEditor = ({
  value,
  onValueChange,
  stopEditing
}: ImageCellEditorProps) => {
  const [preview, setPreview] = useState("");

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onValueChange(reader.result as string);
        stopEditing();
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white">
      <input
        accept="image/*"
        style={{ display: "none" }}
        id="raised-button-file"
        multiple
        type="file"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
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
      <div className="flex flex-row gap-8 w-full justify-between">
        <Button variant="contained" color="success" type="submit">
          Valider
        </Button>
        <Button
          variant="outlined"
          color="error"
          onClick={stopEditing}
        >
          Annuler
        </Button>
      </div>
    </div>
  );
}

export default ImageCellEditor;