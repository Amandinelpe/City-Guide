import { NavLink } from "react-router-dom";
import ControlPointIcon from "@mui/icons-material/ControlPoint";

type ImageCaptionProps = {
  to: string;
  index: number;
  setHoveredImage: (index: number | null) => void;
};

const ImageCaption = ({ to, index, setHoveredImage }: ImageCaptionProps) => {
  return (
    <NavLink
      to={to}
      className="absolute inset-0 bg-black bg-opacity-25 flex
                  items-center justify-center rounded-2xl cursor-pointer"
      onMouseEnter={() => setHoveredImage(index)}
      onMouseLeave={() => setHoveredImage(null)}
    >
      <div
        className="w-full text-white flex flex-col items-center 
                      justify-center rounded-b-2xl mb-1"
      >
        <ControlPointIcon />
      </div>
    </NavLink>
  );
};

export default ImageCaption;
