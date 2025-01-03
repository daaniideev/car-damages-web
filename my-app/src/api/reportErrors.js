import { direccionIp } from "../constants";

async function reportErrors(damagesArray, index) {
  // Verificar que el archivo sea de tipo video mp4
  const url = `http://${direccionIp}}6:5000/report-errors`;
  const formData = new FormData();
  formData.append("damagesArray", damagesArray);
  formData.append("imageRoute", damages.message[index].car_damage_route); // Incluir el nombre del archivo
  try {
    const response = await fetch(url, {
      method: "POST", // Método POST
      body: formData, // El cuerpo de la solicitud contiene el archivo
    });

    if (response.ok) {
      const result = await response.json();
      if (damagesArray.includes("no-damage")) {
        damages.message.splice(index, 1);
        currentIndex = currentIndex - 1;
      } else {
        let damagesArrayTranslated = damagesArray.map(
          (damage) => damages_traduction[damage]
        );
        let damagesString = damagesArrayTranslated.join(", ");
        damages.message[index].car_damage = damagesString;
        console.log("Se ha procesado correctamente:", result);
      }
    } else {
      console.error("Error", response.status, response.statusText);
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
  }
}

export default reportErrors;
