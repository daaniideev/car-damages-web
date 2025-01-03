import React, { useEffect, useState } from "react";
import "../styles/otherStyles.css";
import { direccionIp } from "../constants";
import { MultiSelect } from "primereact/multiselect";
import "primereact/resources/primereact.min.css"; // Estilos de los componentes de PrimeReact
import "primeicons/primeicons.css"; // Estilos de los iconos de PrimeIcons (si los necesitas)
import "primereact/resources/themes/lara-light-indigo/theme.css"; // Un tema para los componentes (puedes elegir otro tema)
import ButtonSubmit from "./ButtonSubmit";
import reportErrors from "../api/reportErrors";
import Spinner from "./Spinner";
import Notificacion from "./Notificacion";
const damagesList = [
  { name: "Cristal roto", code: "glass shatter" },
  { name: "Bolladura", code: "dent" },
  { name: "Rallajo", code: "scratch" },
  { name: "Rueda pinchada", code: "tire flat" },
  { name: "Faro roto", code: "broken lamp" },
  { name: "Sin daños", code: "no-damage" },
];

function ModalReport({ show, handleClose, damages, imageIndex }) {
  const [imageUrl, setImageUrl] = useState(null);
  const [selectedDamage, setSelectedDamage] = useState(null);
  const [showSpinner, setShowSpinner] = useState(false);
  const [showErrorNotification, setShowErrorNotification] = useState(false);
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);

  const handleSubmit = async () => {
    setShowSpinner(true);
    const codes = selectedDamage.map((item) => item.code);
    const response = await reportErrors(codes, imageUrl);
    console.log(response);

    if (response !== null) {
      setShowSpinner(false);
      setShowSuccessNotification(true);
    } else {
      setShowSpinner(false);
      showErrorNotification(true);
    }
  };

  useEffect(() => {
    if (show) {
      setImageUrl(
        `http://${direccionIp}:5000/${damages.message[imageIndex].car_damage_route}`
      ); // Actualizamos el estado con el índice seleccionado
    }
  }, [show]);

  useEffect(() => {
    if (selectedDamage && selectedDamage.length > 0) {
      let selectedDamageArr = selectedDamage.map((item) => item.code);
    }
  }, [selectedDamage]);
  useEffect(() => {}, [imageUrl]);

  if (!show) {
    return null; // No renderiza nada si el ModalReport no debe mostrarse
  }

  return (
    <div style={styles.overlay}>
      <Notificacion
        text="Error reportado"
        type="success"
        show={showSuccessNotification}
        updateShowParent={setShowSuccessNotification}
      />
      <Notificacion
        text="No se ha podido reportar el error"
        type="error"
        show={showErrorNotification}
        updateShowParent={setShowErrorNotification}
      />
      {showSpinner && <Spinner />}

      <div style={styles.ModalReport}>
        <button
          className="clicked-no-underline"
          onClick={() => {
            setSelectedDamage(null);
            handleClose(false);
          }}
        >
          X
        </button>
        <h2 style={styles.h2Style}>Reportar error</h2>
        <div style={styles.divImgStyle}>
          {<img style={styles.imgStyle} src={imageUrl} alt="Damage" />}
        </div>
        <div style={styles.selectorDeDaños}>
          <div style={styles.selectorMultipleContainer}>
            <p>Selecciona los daños:</p>
            <div style={styles.selectorMultiple}>
              <div className="card flex justify-content-center">
                <MultiSelect
                  filter
                  value={selectedDamage}
                  onChange={(e) => {
                    let codeDamages = e.value.map((item) => item.code);
                    let damagesArr = [];
                    if (codeDamages[codeDamages.length - 1] === "no-damage") {
                      damagesArr = [
                        {
                          name: "Sin daños",
                          code: "no-damage",
                        },
                      ];
                    } else if (codeDamages[0] === "no-damage") {
                      damagesArr = e.value.slice(1);
                    } else {
                      damagesArr = e.value;
                    }
                    setSelectedDamage(damagesArr);
                  }}
                  options={damagesList}
                  optionLabel="name"
                  placeholder="Seleccionar"
                  className="w-full md:w-20rem"
                />
              </div>
            </div>
          </div>
          <div style={styles.buttonContainer}>
            <ButtonSubmit text="Enviar" show={true} onClick={handleSubmit} />{" "}
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: "100px",
    right: 0,
    bottom: "100px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  ModalReport: {
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
  buttonContainer: {},
  h2Style: {
    height: "10%",
  },
  divImgStyle: {
    height: "70%",
    width: "100%",
  },
  imgStyle: {
    height: "100%",
  },
  selectorMultiple: {
    justifyContent: "center",
    display: "flex",
    width: "",
  },
  selectorDeDaños: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    justifyContent: "space-around",
    height: "40%",
  },
  selectorMultipleContainer: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    gap: "5%",
  },
};
export default ModalReport;
