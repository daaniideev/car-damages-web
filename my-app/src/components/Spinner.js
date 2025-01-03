import React from "react";
import { ClipLoader } from "react-spinners";

const Spinner = () => {
  return (
    <div style={styles.spinnerContainer}>
      <ClipLoader size={50} color={"#3498db"} loading={true} />
    </div>
  );
};

const styles = {
  spinnerContainer: {
    position: "absolute", // Cambiar a "absolute" para que esté relativo al padre
    top: "50%", // Centra el spinner verticalmente con respecto al padre
    left: "50%", // Centra el spinner horizontalmente con respecto al padre
    transform: "translate(-50%, -50%)", // Ajusta para que quede perfectamente centrado
    zIndex: 9999, // Asegura que el spinner esté por encima de su contenedor padre
  },
};

export default Spinner;
