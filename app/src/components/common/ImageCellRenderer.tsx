import { ChangeEvent, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import ZoomOutMapRoundedIcon from '@mui/icons-material/ZoomOutMapRounded';
import { PulseLoader } from "react-spinners";
import { Modal } from "@mui/material";
import Tooltip from '@mui/material/Tooltip';

type ImageCellProps = {
  src: string;
  data: any;
  handleFileChange: (data: any, fileName: string) => void;
};

const ImageCellRenderer = ({ src, data, handleFileChange }: ImageCellProps) => {
  const [openZoomModal, setOpenZoomModal] = useState<boolean>(false);
  const [hoveredImage, setHoveredImage] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { id } = data;

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    setTimeout(async () => {
      const file = e.target.files?.[0];
      if (file) {
        e.preventDefault();

        const formData = new FormData();
        formData.append("file", file);

        fetch(`${process.env.REACT_APP_GRAPHQL_URI}/upload/file`, {
          method: "POST",
          body: formData,
        })
          .then((response) => response.json())
          .then((fileData: any) => {
            handleFileChange(data, fileData.filename);
            setLoading(false);
          })
      }
    }, 500);
  };

  return (
    <div className="relative w-full h-full">
      <input
        accept="image/*"
        style={{ display: "none" }}
        id={`raised-button-file-` + id}
        multiple
        type="file"
        onChange={handleImageChange}
      />
      <img
        src={`${process.env.REACT_APP_GRAPHQL_URI}/files/${src}`}
        alt="ville"
        className="w-full h-full object-cover object-center"
        onMouseEnter={() => setHoveredImage(true)}
        onMouseLeave={() => setHoveredImage(false)}
      />
      {(hoveredImage || loading) && (
        <div
          className="absolute w-full h-full inset-0 bg-black bg-opacity-25 flex
                        items-center justify-center z-10"
          onMouseEnter={() => setHoveredImage(true)}
          onMouseLeave={() => setHoveredImage(false)}
        >
          <div className="w-full flex items-center justify-center text-white text-sm">
            {loading ? (
              <PulseLoader size={7} color="#ffffff" />
            ) : (
              <div className="w-full flex flex-row items-center justify-center gap-6">
                <label htmlFor={`raised-button-file-` + id}>
                  <Tooltip title="Modifier">
                    <EditIcon className=" cursor-pointer" />
                  </Tooltip>
                </label>
                <Tooltip title="Agrandir">
                  <ZoomOutMapRoundedIcon className="cursor-pointer" onClick={() => setOpenZoomModal(true)} />
                </Tooltip>
              </div>
            )}
          </div>
        </div>
      )
      }
      <Modal
        open={openZoomModal}
        onClose={() => setOpenZoomModal(false)}
        className="flex justify-center items-center"
        closeAfterTransition
      >
        <div className="bg-white p-4 rounded-lg max-w-xl max-h-full overflow-auto">
          <img src={`${process.env.REACT_APP_GRAPHQL_URI}/files/${src}`} alt="Agrandi" className="w-auto h-auto" />
        </div>
      </Modal>
    </div>
  );
};

export default ImageCellRenderer;