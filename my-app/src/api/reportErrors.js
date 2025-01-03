import { direccionIp } from "../constants";

async function reportErrors(damagesArray, imageRoute) {
  const url = `http://${direccionIp}:5000/report-errors`;
  const formData = new FormData();
  formData.append("damagesArray", damagesArray);
  formData.append(
    "imageRoute",
    imageRoute.replace(`http://${direccionIp}:5000/`, "")
  );

  try {
    const response = await fetch(url, {
      method: "POST", // Método POST
      body: formData, // El cuerpo de la solicitud contiene el archivo
    });
    let data;
    if (response.ok) {
      data = await response.json();
      return data.message;
    } else {
      console.error("Error", response.status, response.statusText);
      return null;
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
    return null;
  }
}

export default reportErrors;
