import { direccionIp } from "../constants";

async function getCarDamages(file_name) {
  file_name = file_name.replace("videos/", "");
  let url =
    `http://${direccionIp}:5000/get-car-damages?video_name=` + file_name;
  http: try {
    const response = await fetch(url, {
      method: "GET", // Método GET
      headers: {
        "Content-Type": "application/json", // Cambiar según lo que espera el servidor,
      },
    });

    if (response.ok) {
      return await response.json(); // Leer como JSON
    } else {
      console.error(
        "Error al obtener los daños del coche:",
        response.status,
        response.statusText
      );
      return null;
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
    return null;
  }
}

export default getCarDamages;
