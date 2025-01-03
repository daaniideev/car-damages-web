import React, { useState } from "react";

// Componente de botón de submit
const ButtonSubmit = ({ text, show, onClick, clickable }) => {
  const [isActive, setIsActive] = useState(false);

  // Cambiar el estado al presionar y soltar el botón
  const handleMouseDown = () => {
    setIsActive(true); // Cuando se presiona el botón
  };

  const handleMouseUp = () => {
    setIsActive(false); // Cuando se suelta el botón
  };

  if (!show) return null;

  return (
    <button
      type="submit"
      style={
        isActive
          ? { ...styles.button, ...styles.buttonActive }
          : clickable
          ? styles.button
          : { ...styles.button, ...styles.buttonDisabled } // Aplica el estilo de deshabilitado si no es clickeable
      }
      onClick={clickable ? onClick : null} // Si no es clickeable, no ejecuta onClick
      onMouseDown={clickable ? handleMouseDown : null} // Si no es clickeable, no maneja el evento de presionar
      onMouseUp={clickable ? handleMouseUp : null} // Si no es clickeable, no maneja el evento de soltar
      disabled={!clickable} // Deshabilita el botón si clickable es false
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
    backgroundColor: "#17a2b8", // Verde para enviar
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
  // Estilo para cuando el botón no es clickeable
  buttonDisabled: {
    backgroundColor: "#d6d6d6", // Color de fondo gris para deshabilitado
    cursor: "not-allowed", // Cursor deshabilitado
  },
};

export default ButtonSubmit;
