function obtenerFecha() {
  // Crear un objeto Date
  const fecha = new Date();

  // Obtener los componentes de la fecha
  const dia = String(fecha.getDate()).padStart(2, "0");
  const mes = String(fecha.getMonth() + 1).padStart(2, "0"); // Los meses comienzan en 0, por eso sumamos 1
  const año = fecha.getFullYear();

  // Obtener los componentes de la hora
  const hora = String(fecha.getHours()).padStart(2, "0");
  const minuto = String(fecha.getMinutes()).padStart(2, "0");
  const segundo = String(fecha.getSeconds()).padStart(2, "0");
  const milisegundo = String(fecha.getMilliseconds()).padStart(3, "0");

  // Formatear la fecha como DDMMAAAA_HHMMSSMMM
  const fechaFormateada = `${dia}${mes}${año}_${hora}${minuto}${segundo}${milisegundo}`;

  return fechaFormateada;
}
export default obtenerFecha;
