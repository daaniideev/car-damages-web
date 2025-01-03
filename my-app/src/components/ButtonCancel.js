import React, { useState } from "react";

// Componente de botón de cancelar
const ButtonCancel = ({ text, show, onClick }) => {
  const [isClicked, setIsClicked] = useState(false);

  // Cambiar el estado al presionar y soltar el botón
  const handleMouseDown = () => {
    setIsClicked(true); // Cuando se presiona el botón
  };

  const handleMouseUp = () => {
    setIsClicked(false); // Cuando se suelta el botón
  };

  if (!show) return null;

  return (
    <button
      type="button"
      style={
        isClicked ? { ...styles.button, ...styles.buttonActive } : styles.button
      }
      onClick={onClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      {text}
    </button>
  );
};

// Estilos para el botón
const styles = {
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#6c757d", // Rojo para cancelar
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s, transform 0.1s", // Suaviza la transición
  },
  // Estilo para cuando el botón es presionado (clicado)
  buttonActive: {
    transform: "scale(0.95)", // Efecto de "aplastamiento" al hacer clic
    backgroundColor: "#d32f2f", // Cambiar color de fondo cuando está presionado
  },
};

export default ButtonCancel;
