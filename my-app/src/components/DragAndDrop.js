import React, { useState } from "react";

const DragAndDrop = ({
  videoFile,
  setVideoFile,
  videoPreview,
  setVideoPreview,
}) => {
  const [isDragging, setIsDragging] = useState(false); // Para controlar si hay un archivo siendo arrastrado

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false); // Restablecer estado de arrastre
    const file = e.dataTransfer.files[0];

    if (file && file.type === "video/mp4") {
      setVideoFile(file);
      setVideoPreview(URL.createObjectURL(file));
    } else {
      alert("Por favor, carga un archivo .mp4");
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true); // Establecer estado de arrastre
  };

  const handleDragLeave = () => {
    setIsDragging(false); // Restablecer estado de arrastre cuando el archivo deja la zona
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "video/mp4") {
      setVideoFile(file);
      setVideoPreview(URL.createObjectURL(file));
    } else {
      alert("Por favor, carga un archivo .mp4");
    }
  };

  return (
    <div style={styles.container}>
      {/* Solo mostramos la zona de arrastre si no se ha cargado ningún archivo */}
      {!videoFile && (
        <div
          className={`drop-zone ${isDragging ? "dragover" : ""}`} // Añadir clase cuando arrastran un archivo
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <p>
            Arrastra y suelta tu archivo .mp4 aquí o haz clic para seleccionarlo
          </p>
          <input
            type="file"
            accept="video/mp4"
            style={styles.fileInput}
            onChange={handleFileUpload}
          />
        </div>
      )}

      {/* Si se ha cargado un archivo, mostramos el nombre del archivo */}
      {videoFile && <p>Archivo cargado: {videoFile.name}</p>}

      {/* Si se ha cargado un archivo, mostramos el preview del video */}
      {videoPreview && (
        <div style={styles.preview}>
          <video controls width="400">
            <source src={videoPreview} type="video/mp4" />
            Tu navegador no soporta la reproducción de videos.
          </video>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Arial, sans-serif",
  },
  fileInput: {
    position: "absolute",
    width: "100%",
    height: "100%",
    opacity: 0,
    cursor: "pointer",
  },
  preview: {
    marginTop: "20px",
    textAlign: "center",
  },
};

export default DragAndDrop;
