import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";

type CustomFloatingButtonProps = {
  handlerButtonAction: () => void;
}

const CustomFloatingButton = (
  { handlerButtonAction }: CustomFloatingButtonProps
) => {
  const [isAboveFooter, setIsAboveFooter] = useState(true);
  const [fabBottom, setFabBottom] = useState('32px');

  const handleScroll = () => {
    const footer = document.querySelector('.footer');
    const footerHeight = footer?.clientHeight;
    const footerRect = footer?.getBoundingClientRect();

    if (footerRect) {
      const distanceFromBottom = window.innerHeight - footerRect.top;
      if (distanceFromBottom > 0) {
        setFabBottom(`${distanceFromBottom + 32}px`);
        setIsAboveFooter(false);
      } else {
        setFabBottom('32px');
        setIsAboveFooter(true);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed right-8 z-10" style={{ bottom: fabBottom }}>
      <Fab style={{ backgroundColor: '#E57373', color: 'white' }} aria-label="add" onClick={handlerButtonAction}>
        <AddIcon />
      </Fab>
    </div>
  );
}

export default CustomFloatingButton;