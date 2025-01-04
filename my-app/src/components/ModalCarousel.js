import React, { useState, useEffect } from "react";
import ImageCarousel from "./ImageCarousel";
import "../styles/otherStyles.css";

function ModalCarousel({
  show,
  handleClose,
  damages,
  showModalReport,
  getImageIndexApp,
  notificationMessage,
}) {
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    getImageIndexApp(imageIndex);
  }, [imageIndex]);

  if (show) {
    return (
      <div style={styles.overlay}>
        <div style={styles.ModalCarousel}>
          <button
            className="clicked-no-underline"
            onClick={() => {
              handleClose(false);
            }}
          >
            X
          </button>
          <h2 style={styles.h2Style}>Daños detectados</h2>
          <h3 style={styles.p}>
            {damages[imageIndex].car_damage.charAt(0).toUpperCase() +
              damages[imageIndex].car_damage.slice(1)}
          </h3>
          <div style={styles.subContainer}>
            <ImageCarousel
              damages={damages}
              getImageIndexModalCarousel={setImageIndex}
            />
          </div>

          <p
            onClick={() => {
              showModalReport(true);
            }}
            className="clicked"
          >
            Reportar error
          </p>
        </div>
      </div>
    );
  } else {
    return null;
  }
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
  ModalCarousel: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    position: "relative",
    width: "40vw",
    height: "50vh",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#2c3e50",
  },
  h2Style: {
    height: "8%",
    margin: 0,
    textAlign: "left",
    display: "inline-block" /* Ajusta el tamaño del borde al texto */,
    borderBottom: "2px solid rgb(60, 80, 100)", // Subrayado similar al fondo
    paddingBottom: "5px",
  },
  p: {
    height: "10%",
    textAlign: "left",
    display: "flex",
    alignItems: "center",
  },
  subContainer: {
    height: "78%",
    backgroundColor: "white",
    borderRadius: "10px",
  },
};

export default ModalCarousel;
