import React, { useState, useEffect } from "react";

// Componente de notificación
const Notificacion = ({ type, text, show, updateShowParent }) => {
  // Estado para controlar la visibilidad de la notificación
  const [visible, setVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  // Función para cerrar la notificación al hacer clic
  const handleClick = () => {
    setVisible(false);
  };

  useEffect(() => {
    if (show) {
      setShouldRender(true);
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [show]);

  useEffect(() => {
    let timer; // Declarar `timer` fuera de los bloques para que esté disponible globalmente en este `useEffect`

    if (visible) {
      timer = setTimeout(() => {
        setVisible(false); // Establece visible como false después de 5 segundos
      }, 5000);
    } else {
      timer = setTimeout(() => {
        setShouldRender(false); // Retrasa la eliminación del componente
      }, 450); // Duración de la animación `slideUp`
    }

    return () => clearTimeout(timer); // Limpieza del temporizador
  }, [visible]);

  useEffect(() => {
    !shouldRender && updateShowParent(false);
  }, [shouldRender]);

  // Si la notificación no es visible, no se renderiza
  if (!shouldRender) return null;

  // Determinamos el color de fondo según el tipo
  const backgroundColor = type === "error" ? "#e74c3c" : "#27ae60 "; // Rojo para error, verde para success

  // Determinamos el ícono a mostrar según el tipo
  const icon = type === "error" ? "✖" : "✔";

  return (
    <div
      style={{
        ...styles.notificationContainer,
        backgroundColor,
        animation: visible ? "slideDown 0.5s ease-out" : "slideUp 0.5s ease-in", // Animación basada en la visibilidad
      }}
      onClick={handleClick} // Cerramos la notificación al hacer clic
    >
      <span style={styles.icon}>{icon}</span>
      <p style={styles.notificationText}>{text}</p>
    </div>
  );
};

// Estilos para la notificación
const styles = {
  notificationContainer: {
    position: "fixed", // Hace que la notificación sea fija en la pantalla
    top: "1%", // 1% desde la parte superior
    left: "50%", // Centrado horizontal
    transform: "translateX(-50%)", // Ajusta para que quede perfectamente centrado
    color: "white",
    padding: "10px 20px",
    borderRadius: "5px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Sombra para darle un efecto de profundidad
    zIndex: 9999, // Asegura que la notificación esté sobre otros elementos
    display: "flex",
    justifyContent: "flex-start", // Para alinear los íconos a la izquierda
    alignItems: "center", // Centra el texto verticalmente
    transition: "opacity 0.3s ease", // Transición suave de opacidad
    cursor: "pointer", // Cambia el cursor para indicar que es clickeable
  },
  icon: {
    fontSize: "20px", // Tamaño del ícono
    marginRight: "10px", // Espacio entre el ícono y el texto
  },
  notificationText: {
    margin: 0, // Elimina márgenes por defecto en el párrafo
    fontSize: "16px",
    color: "white",
  },
};

export default Notificacion;
