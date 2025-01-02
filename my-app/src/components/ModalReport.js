import React, { useEffect, useState } from "react";
import "../styles/otherStyles.css";
import { direccionIp } from "../constants";
import { MultiSelect } from "primereact/multiselect";
import "primereact/resources/primereact.min.css"; // Estilos de los componentes de PrimeReact
import "primeicons/primeicons.css"; // Estilos de los iconos de PrimeIcons (si los necesitas)
import "primereact/resources/themes/lara-light-indigo/theme.css"; // Un tema para los componentes (puedes elegir otro tema)

const damagesList = [
  { name: "Cristal roto", code: "glass-shatter" },
  { name: "Bolladura", code: "dent" },
  { name: "Rallajo", code: "scratch" },
  { name: "Rueda pinchada", code: "tire-flat" },
  { name: "Faro roto", code: "broken-lamp" },
  { name: "Sin daños", code: "no-damage" },
];
function ModalReport({ show, handleClose, damages }) {
  const [imageUrl, setImageUrl] = useState(null);
  const [selectedDamage, setSelectedDamage] = useState(null);

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
    if (selectedDamage && selectedDamage.length > 0) {
      let selectedDamageArr = selectedDamage.map((item) => item.code);
      console.log(selectedDamageArr);
    }
  }, [selectedDamage]);
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
        <div style={styles.selectorDeDaños}>
          <p>Selecciona los daños:</p>
          <div style={styles.selectorMultiple}>
            <MultiSelect
              value={selectedDamage}
              onChange={(e) => {
                let codeDamages = e.value.map((item) => item.code);
                let damagesArr = [];
                if (codeDamages.includes("no-damage")) {
                  damagesArr = [
                    {
                      name: "Sin daños",
                      code: "no-damage",
                    },
                  ];
                } else {
                  damagesArr = e.value;
                }
                setSelectedDamage(damagesArr);
              }}
              display="chip"
              options={damagesList}
              optionLabel="name"
              placeholder="Seleccionar"
              maxSelectedLabels={5}
              className="w-full md:w-20rem"
            />
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
  selectorMultiple: {
    justifyContent: "center",
    display: "flex",
  },
  selectorDeDaños: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    margin: "auto",
    gap: "2rem",
  },
};

export default ModalReport;
