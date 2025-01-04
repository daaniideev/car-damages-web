import React, { useState, useEffect } from "react";
import DragAndDrop from "./components/DragAndDrop";
import ButtonSubmit from "./components/ButtonSubmit";
import ButtonCancel from "./components/ButtonCancel";
import Spinner from "./components/Spinner";
import uploadVideo from "./api/uploadVideo";
import getCarDamages from "./api/getCarDamages";
import obtenerFecha from "./functions";
import ModalCarousel from "./components/ModalCarousel";
import ModalReport from "./components/ModalReport";
import Notificacion from "./components/Notificacion";
function App() {
  // Mover el estado videoFile aquí
  const [videoFile, setVideoFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [showSpinner, setShowSpinner] = useState(false);

  // Notifications
  const [showNotification, setShowNotification] = useState(false);
  const [showSuccessReportNotification, setShowSuccessReportNotification] =
    useState(false);
  const [showErrorReportNotification, setShowErrorSuccessReportNotification] =
    useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  // Notifications

  const [showModalButton, setShowModalButton] = useState(false);
  const [showModalCarousel, setShowModalCarousel] = useState(false);
  const [showModalReport, setShowModalReport] = useState(false);
  //
  const [imageIndex, setImageIndex] = useState(0);

  const [damages, setDamages] = useState({});

  const handleCancel = () => {
    setVideoFile(null); // Restablecer el archivo cuando se cancela
    setVideoPreview(null); // Restablecer el preview
    setShowModalButton(false); // Restablecer el preview
  };

  const handleSubmit = async () => {
    setShowSpinner(true);
    let ext = videoFile.name.split(".").pop(); // Obtiene la última parte después del punto
    let fileName = `videos/${obtenerFecha()}.${ext}`;

    let result = await uploadVideo(videoFile, fileName);
    result = await getCarDamages(fileName);
    if (result) {
      setNotificationMessage("Daños detectados.");
      setDamages(result.message);
      setShowModalButton(true);
      setShowSpinner(false);
      setShowNotification(true);
    }
  };
  const handleSeeDamages = () => {
    setShowModalCarousel(true);
  };

  useEffect(() => {
    (showSuccessReportNotification || showErrorReportNotification) &&
      setShowModalReport(false);
  }, [showSuccessReportNotification, showErrorReportNotification]);

  return (
    <div style={styles.container}>
      <Notificacion
        text={notificationMessage}
        type="success"
        show={showNotification}
        updateShowParent={setShowNotification}
      />
      <Notificacion
        text={notificationMessage}
        type="success"
        show={showSuccessReportNotification}
        updateShowParent={setShowSuccessReportNotification}
      />
      <Notificacion
        text={notificationMessage}
        type="error"
        show={showErrorReportNotification}
        updateShowParent={setShowErrorSuccessReportNotification}
      />
      <div style={!videoPreview ? styles.subcontainer : styles.subcontainer2}>
        <h1>Predictor de daños de coches</h1>
        <DragAndDrop
          videoFile={videoFile}
          setVideoFile={setVideoFile}
          videoPreview={videoPreview}
          setVideoPreview={setVideoPreview}
        />
        {showSpinner && <Spinner />}
        <div style={styles.buttonsContainer}>
          <ButtonCancel
            text="Cancelar"
            show={videoFile}
            onClick={handleCancel}
          />
          <ButtonSubmit
            text="Cargar video"
            show={videoFile && !showModalButton}
            onClick={handleSubmit}
            type="uploadVideo"
          />
          <ButtonSubmit
            text="Ver daños"
            show={showModalButton}
            onClick={handleSeeDamages}
            type="seeDamages"
          />
        </div>
        <ModalCarousel
          show={showModalCarousel}
          handleClose={setShowModalCarousel}
          damages={damages}
          showModalReport={setShowModalReport}
          getImageIndexApp={setImageIndex}
          notificationMessage={setNotificationMessage}
        />
        <ModalReport
          show={showModalReport}
          handleClose={setShowModalReport}
          damages={damages}
          imageIndex={imageIndex}
          showSuccessNotification={setShowSuccessReportNotification}
          showErrorNotification={setShowErrorSuccessReportNotification}
          setDamages={setDamages}
          notificationMessage={setNotificationMessage}
        />
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex", // Usa flexbox
    flexDirection: "column", // Coloca los elementos en columna
    height: "100vh", // Altura completa de la ventana
    textAlign: "center", // Centra el texto
    backgroundColor: "#2c3e50",
    justifyContent: "center",
    aligItems: "center",
  },
  subcontainer: {
    display: "flex",
    flexDirection: "column", // Organiza los elementos en columna
    position: "relative", // Establecemos posición relativa para mover el subcontainer
    top: "-200px", // Mueve el subcontainer 100px hacia arriba
  },
  subcontainer2: {
    display: "flex",
    flexDirection: "column", // Organiza los elementos en columna
    position: "relative", // Establecemos posición relativa para mover el subcontainer
  },
  buttonsContainer: {
    display: "flex",
    gap: "20px",
    justifyContent: "center",
    marginTop: "20px",
  },
};

export default App;
