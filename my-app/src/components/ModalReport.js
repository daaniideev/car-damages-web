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

const damagesList = [
  { name: "cristal roto", code: "glass shatter" },
  { name: "bolladura", code: "dent" },
  { name: "rallada", code: "scratch" },
  { name: "rueda pinchada", code: "tire flat" },
  { name: "faro roto", code: "broken lamp" },
  { name: "sin daños", code: "no-damage" },
];

function ModalReport({
  show,
  handleClose,
  damages,
  imageIndex,
  showSuccessNotification,
  showErrorNotification,
  setDamages,
  notificationMessage,
}) {
  const [imageUrl, setImageUrl] = useState(null);
  const [selectedDamage, setSelectedDamage] = useState(null);
  const [showSpinner, setShowSpinner] = useState(false);
  const handleSubmit = async () => {
    const names = selectedDamage.map((item) => item.code);
    setShowSpinner(true);
    if (names.length === 0) {
      notificationMessage("Selecciona al menos un daño.");
      showErrorNotification(true);
      setShowSpinner(false);
      return;
    } else if (
      names.length === 1 &&
      names[0] === damages[imageIndex].car_damage
    ) {
      notificationMessage(
        "Selecciona un daño distinto al que el modelo ya ha predicho."
      );
      showErrorNotification(true);
      setShowSpinner(false);
      return;
    }
    const codes = selectedDamage.map((item) => item.code);
    const response = await reportErrors(codes, imageUrl);
    if (response !== null) {
      let damagesString = selectedDamage.map((item) => item.name).join(", ");
      // La última coma la quito y pongo un 'y':
      damagesString = damagesString.replace(/,(?=[^,]*$)/, " y");
      let damagesObj = damages;
      damagesObj[imageIndex].car_damage = damagesString;
      setDamages(damagesObj);
      setSelectedDamage(null);
      setShowSpinner(false);
      notificationMessage("Error reportado.");
      showSuccessNotification(true);
    } else {
      notificationMessage("No se ha podido reportar el error.");
      setSelectedDamage(null);
      setShowSpinner(false);
      showErrorNotification(true);
    }
  };

  useEffect(() => {
    if (show) {
      setImageUrl(
        `http://${direccionIp}:5000/${damages[imageIndex].car_damage_route}`
      );
    }
  }, [show, damages, imageIndex]);

  if (!show) {
    return null;
  }

  return (
    <div style={styles.overlay}>
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
                      console.log("e.value");
                      console.log(e.value);
                      damagesArr = [
                        {
                          name: "sin daños",
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
