import React from "react";
import ImageCarousel from "./ImageCarousel";
import "../styles/otherStyles.css";

function ModalCarousel({ show, handleClose, title, damages }) {
  if (!show) {
    return null; // No renderiza nada si el ModalCarousel no debe mostrarse
  }

  return (
    <div style={styles.overlay}>
      <div style={styles.ModalCarousel}>
        <button
          style={styles.closeButton}
          onClick={() => {
            handleClose(false);
          }}
        >
          X
        </button>
        <h2 style={styles.h2Style}>{title}</h2>
        <ImageCarousel damages={damages} />
        <p className="clicked">Reportar error</p>
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
  ModalCarousel: {
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
};

export default ModalCarousel;
