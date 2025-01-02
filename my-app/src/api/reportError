import { direccionIp } from "../constants";
async function uploadVideo(file, filename) {
  // Verificar que el archivo sea de tipo video mp4
  if (file.type !== "video/mp4") {
    console.error("El archivo debe ser un MP4.");
    return null; // Retorna null si el archivo no es de tipo mp4
  }

  const url = `http://${direccionIp}:5000/upload-video`;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("filename", filename);
  console.log(filename);
  try {
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const result = await response.json(); // Lee la respuesta JSON
      console.log("Archivo subido con éxito:", result);
      return result; // Devuelve el resultado si la carga es exitosa
    } else {
      console.error(
        "Error al subir el archivo:",
        response.status,
        response.statusText
      );
      return null; // Devuelve null si hubo un error en la respuesta
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
    return null; // Devuelve null si hubo un error en la solicitud
  }
}

export default uploadVideo;
