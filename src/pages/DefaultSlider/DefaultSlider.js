import React, { useRef } from "react";
import classes from "./DefaultSlider.module.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import EventCard from "./EventCard/EventCard";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";

function DefaultSlider({ data, title, containerClass, loading }) {
  const outerContainerWidth = (88 * window.innerWidth) / 100;
  const cardWidth = 630;
  const gapBetweenCards = 15;
  const customArrow = "/img/right-arrow.svg";

  const sliderRef = useRef(null);

  const numCardsToShow =
    (outerContainerWidth + gapBetweenCards) / (cardWidth + gapBetweenCards);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: numCardsToShow,
    // slidesToShow: 2.6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    margin: 15,
    //     centerMode: true, // Add centerMode
    // centerPadding: '-15px', // Adjust as needed
    centerMode: false,
    variableWidth: true,
    // nextArrow: <CustomNextArrow />,
  };

  const handleNextArrowClick = (originalOnClick) => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  const handlePreviousArrowClick = (originalOnClick) => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
      console.log("value is", sliderRef.current);
    }
  };

  console.log('data value is', data)

  return (
    <div className={`${classes.venuesOuter} ${containerClass}`}>
      <h2 className={classes.eventTitle}>{title}</h2>
      <img
        className={classes.rightArrow}
        onClick={handleNextArrowClick}
        src="/img/right-arrow.svg"
      />
      {/* <img
        className={classes.leftArrow}
        onClick={handlePreviousArrowClick}
        src="/img/left-arrow.svg"
      /> */}
      {loading ? <LoadingComponent /> : (
      <Slider {...settings} ref={sliderRef}>
        {data.map((card, index) => (
          <div key={index}>
            {/* <Link to={`venues/venue/${card._id}`}> */}
            <EventCard
              image={card.img}
              title={card.title}
              review={card.review}
              city={card.city}
              state={card.state}
              price={card.price}
              strikePrice={card.strikePrice}
            />
            {/* </Link> */}
          </div>
        ))}
      </Slider>
      )}
    </div>
  );
}

export default DefaultSlider;
