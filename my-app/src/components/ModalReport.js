import React, { useEffect, useState } from "react";
import ImageCarousel from "./ImageCarousel";
import "../styles/otherStyles.css";
import { direccionIp } from "../constants";
function ModalReport({ show, handleClose, damages }) {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    if (show) {
      const a = document.getElementsByClassName("slider animated");
      const slides = a[0].querySelectorAll("li"); // Seleccionamos todos los <li> dentro de a[0]
      const index = Array.from(slides).findIndex((slide) =>
        slide.classList.contains("selected")
      );
      setImageUrl(
        `http://${direccionIp}:5000/${damages.message[index].car_damage_route}`
      ); // Actualizamos el estado con el índice seleccionado
    }
  }, [show]);

  useEffect(() => {
    console.log("damages.message[selectedIndex]");
    console.log(damages.message);
    console.log(imageUrl);
  }, [imageUrl]);

  if (!show) {
    return null; // No renderiza nada si el ModalReport no debe mostrarse
  }

  return (
    <div style={styles.overlay}>
      <div style={styles.ModalReport}>
        <button
          style={styles.closeButton}
          onClick={() => {
            handleClose(false);
          }}
        >
          X
        </button>
        <h2 style={styles.h2Style}>Reportar error</h2>
        <div style={styles.divImgStyle}>
          {<img style={styles.imgStyle} src={imageUrl} alt="Damage" />}
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Fondo semitransparente
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  ModalReport: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    position: "relative",
    width: "40vw",
    height: "50vh",
    display: "flex",
    flexDirection: "column",
  },
  closeButton: {
    position: "absolute",
    top: "10px",
    right: "10px",
    border: "none",
    backgroundColor: "transparent",
    fontSize: "20px",
    cursor: "pointer",
  },
  h2Style: {
    height: "10%",
  },
  divImgStyle: {
    height: "50%",
    width: "100%",
  },
  imgStyle: {
    height: "100%",
  },
};

export default ModalReport;
