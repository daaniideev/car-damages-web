import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../styles/carouselCustomStyles.css";
import { direccionIp } from "../constants";

function ImageCarousel({ damages }) {
  console.log(damages.message.slice(0, 3));
  const images = damages.message.map(
    (damage) => `http://${direccionIp}:5000/${damage.car_damage_route}`
  );

  return (
    <div style={styles.carouselContainer}>
      <Carousel useKeyboardArrows={true}>
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
    height: "80%",
    margin: "auto",
    display: "flex",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
};

export default ImageCarousel;
