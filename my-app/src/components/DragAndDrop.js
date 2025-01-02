import React from "react";

const DragAndDrop = ({
  videoFile,
  setVideoFile,
  videoPreview,
  setVideoPreview,
}) => {
  const handleDrop = (e) => {
    e.preventDefault();
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
          style={styles.dropZone}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
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
  dropZone: {
    width: "400px",
    height: "200px",
    border: "2px dashed #ccc",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    position: "relative",
    cursor: "pointer",
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
