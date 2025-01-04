import React, { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../styles/carouselCustomStyles.css";
import { direccionIp } from "../constants";

function ImageCarousel({ damages, getImageIndexModalCarousel }) {
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    getImageIndexModalCarousel(imageIndex);
  }, [imageIndex]);

  const images = damages.map(
    (damage) => `http://${direccionIp}:5000/${damage.car_damage_route}`
  );

  // Esta función se llama cuando cambia la imagen
  const handleChange = (index) => {
    setImageIndex(index);
  };

  return (
    <div style={styles.carouselContainer}>
      <Carousel
        useKeyboardArrows={true}
        selectedItem={imageIndex} // Asegura que el índice se sincronice con el carousel
        onChange={handleChange} // Actualiza el índice cuando cambian las imágenes
      >
        {images.map((url, index) => (
          <div key={index}>
            <img alt={`Damage ${index}`} src={url} style={styles.image} />
          </div>
        ))}
      </Carousel>
    </div>
  );
}

const styles = {
  carouselContainer: {
    width: "80%",
    height: "100%",
    margin: "auto",
    display: "flex",
    paddingTop: "10px",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
};

export default ImageCarousel;
