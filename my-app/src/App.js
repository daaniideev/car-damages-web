import React, { useState } from "react";
import DragAndDrop from "./components/DragAndDrop";
import ButtonSubmit from "./components/ButtonSubmit";
import ButtonCancel from "./components/ButtonCancel";
import Spinner from "./components/Spinner";
import uploadVideo from "./api/uploadVideo";
import getCarDamages from "./api/getCarDamages";
import obtenerFecha from "./functions";
import ModalCarousel from "./components/ModalCarousel";
function App() {
  // Mover el estado videoFile aquí
  const [videoFile, setVideoFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [showSpinner, setShowSpinner] = useState(false);
  const [showModalCarousel, setShowModalCarousel] = useState(false);
  const [damages, setDamages] = useState({});

  const handleCancel = () => {
    setVideoFile(null); // Restablecer el archivo cuando se cancela
    setVideoPreview(null); // Restablecer el preview
  };

  const handleSubmit = async () => {
    setShowSpinner(true);
    let ext = videoFile.name.split(".").pop(); // Obtiene la última parte después del punto
    let fileName = `videos/${obtenerFecha()}.${ext}`;

    let result = await uploadVideo(videoFile, fileName);
    result = await getCarDamages(fileName);
    if (result) {
      console.log(result);
      setDamages(result);
      setShowModalCarousel(true);
      setShowSpinner(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1>Predictor de daños de coches</h1>
      {/* Pasamos videoFile y setVideoFile como props a DragAndDrop */}
      <DragAndDrop
        videoFile={videoFile}
        setVideoFile={setVideoFile}
        videoPreview={videoPreview}
        setVideoPreview={setVideoPreview}
      />
      {showSpinner && <Spinner />}
      <div style={styles.buttonsContainer}>
        <ButtonCancel text="Cancelar" show={videoFile} onClick={handleCancel} />
        <ButtonSubmit
          text="Cargar viedo"
          show={videoFile}
          onClick={handleSubmit}
        />
      </div>
      <ModalCarousel
        show={showModalCarousel}
        handleClose={setShowModalCarousel}
        title="Contenido del ModalCarousel"
        damages={damages}
      />{" "}
    </div>
  );
}

const styles = {
  container: {
    display: "flex", // Usa flexbox
    flexDirection: "column", // Coloca los elementos en columna
    justifyContent: "center", // Centra horizontalmente
    alignItems: "center",
    height: "100vh", // Altura completa de la ventana
    textAlign: "center", // Centra el texto
  },
  buttonsContainer: {
    display: "flex",
    gap: "20px",
    justifyContent: "center",
    marginTop: "20px",
  },
};

export default App;
