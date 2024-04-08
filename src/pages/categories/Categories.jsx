import React, { useState } from "react";
import Slider from "react-slick";
import classes from "./Categories.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const imageData = [
  { img: "img/action-movie.jpg", title: "Action" },
  { img: "img/adventure-movie.jpg", title: "Adventure" },
  { img: "img/comedy-movie.jpg", title: "Comedy" },
  { img: "img/thriller-movie.jpg", title: "Thriller" },
  { img: "img/romantic-movie.jpg", title: "Romantic" },
  // Add more image URLs as needed
];

function Categories() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000, // Transition speed in milliseconds
    slidesToShow: 4, // Number of slides to show at a time
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000, // Autoplay speed in milliseconds (3 seconds)
    responsive: [
      {
        breakpoint: 650, // Adjust the breakpoint value as needed
        settings: {
          slidesToShow: 3, // Show 3 slides when screen width is below 900 pixels
        },
      },
      {
        breakpoint: 460, // Adjust the breakpoint value as needed
        settings: {
          slidesToShow: 2, // Show 3 slides when screen width is below 900 pixels
        },
      },
    ],
  };


  return (
    <div className="categories-slider">
      <div className={classes.categoriesOuter}>
        <h2>Categories</h2>
        <Slider {...settings}>
          {imageData.map((item, index) => (
            <div className = {classes.categoryCircle} key={index}>
              <img
                // src={image.img}
                src={item.img}
                alt={`Image ${index + 1}`}
                style={{ borderRadius: "50%" }}
              />
              <h3>{item.title}</h3>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default Categories;
