import React, { useState } from "react";

// Componente de botón de submit
const ButtonSubmit = ({ text, show, onClick, type }) => {
  const [isActive, setIsActive] = useState(false);

  // Cambiar el estado al presionar y soltar el botón
  const handleMouseDown = () => {
    setIsActive(true); // Cuando se presiona el botón
  };

  const handleMouseUp = () => {
    setIsActive(false); // Cuando se suelta el botón
  };

  if (!show) return null;

  // Estilo dinámico basado en el tipo
  const dynamicStyles = {
    ...(type === "seeDamages" && { backgroundColor: "rgb(39, 174, 96)" }),
  };

  return (
    <button
      type="submit"
      style={
        isActive
          ? { ...styles.button, ...styles.buttonActive, ...dynamicStyles }
          : { ...styles.button, ...dynamicStyles }
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
    backgroundColor: "#17a2b8", // Azul claro para enviar
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s, transform 0.1s", // Suaviza la transición
  },
  // Estilo para cuando el botón es presionado (clicado)
  buttonActive: {
    transform: "scale(0.95)", // Efecto de "aplastamiento" al hacer clic
    backgroundColor: "#45a049", // Cambiar color de fondo cuando está presionado
  },
};

export default ButtonSubmit;
