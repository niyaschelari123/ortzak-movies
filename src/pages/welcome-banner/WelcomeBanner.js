import React from "react";
import classes from "./WelcomeBanner.module.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './banner.css';

const images = [
  "/img/banner-one.jpg",
  "/img/banner-two.jpg",
  "/img/banner-three.png",
  "/img/banner-four.png",
  "/img/banner-five.jpg",
  "/img/banner-six.jpg",
  "/img/banner-seven.jpg",
];

const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, // Enable autoplay
    autoplaySpeed: 4000 // Set autoplay speed (in milliseconds)
  };

function WelcomeBanner() {
  return (
    <div className = "home-slider-div">
    <div className={classes.sliderOuter}>
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <img src={image} alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </Slider>
    </div>
    </div>
  );
}

export default WelcomeBanner;
