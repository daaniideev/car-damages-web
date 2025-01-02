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
    position: "fixed", // Hace que el spinner se superponga sobre el contenido
    top: "50%", // Centra el spinner verticalmente
    left: "50%", // Centra el spinner horizontalmente
    transform: "translate(-50%, -50%)", // Ajusta para que quede perfectamente centrado
    zIndex: 9999, // Asegura que el spinner esté por encima de todo
  },
};

export default Spinner;
