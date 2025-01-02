import React, { useState } from "react";

const options = [
  { label: "Grapes 🍇", value: "grapes" },
  { label: "Mango 🥭", value: "mango" },
  { label: "Strawberry 🍓", value: "strawberry", disabled: true },
];

const Select = () => {
  const [selected, setSelected] = useState([]);

  return (
    <div>
      <h3>No es correcta le predicción?</h3>
      <div style={styles.container}>
        <p style={styles.p}>Selecciona la predicción:</p>
        <MultiSelect
          className="multiple-selector"
          options={options}
          value={selected}
          onChange={setSelected}
          labelledBy="Seleccionar"
        />
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    gap: "5%",
  },
};

export default Select;
