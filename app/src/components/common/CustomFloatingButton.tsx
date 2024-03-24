import { Fab } from "@mui/material";
import { ReactElement, useEffect, useState } from "react";

type CustomFloatingButtonProps = {
  icon: ReactElement;
  handlerButtonAction: () => void;
}

const CustomFloatingButton = (
  { icon, handlerButtonAction }: CustomFloatingButtonProps
) => {
  const [fabBottom, setFabBottom] = useState('32px');

  const handleScroll = () => {
    const footer = document.querySelector('.footer');
    const footerRect = footer?.getBoundingClientRect();

    if (footerRect) {
      const distanceFromBottom = window.innerHeight - footerRect.top;
      if (distanceFromBottom > 0) {
        setFabBottom(`${distanceFromBottom + 32}px`);
      } else {
        setFabBottom('32px');
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
        {icon}
      </Fab>
    </div>
  );
}

export default CustomFloatingButton;