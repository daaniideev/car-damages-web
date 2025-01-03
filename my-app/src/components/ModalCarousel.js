import React, { useState, useEffect } from "react";
import ImageCarousel from "./ImageCarousel";
import "../styles/otherStyles.css";

function ModalCarousel({
  show,
  handleClose,
  damages,
  showModalReport,
  getImageIndexApp,
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
          <p style={styles.p}>{damages.message[imageIndex].car_damage}</p>
          <ImageCarousel
            damages={damages}
            getImageIndexModalCarousel={setImageIndex}
          />
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
    borderRadius: "20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    position: "relative",
    width: "40vw",
    height: "50vh",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#1E1E1E",
  },
  h2Style: {
    height: "10%",
    marginTop: 0,
  },
  p: {
    height: "10%",
  },
};

export default ModalCarousel;
