import React from "react";
import classes from "./EventCard.module.css";
import { Link } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import { database } from "../../../firebase";

function EventCard({ id, image, title, review, city, state, price, strikePrice }) {
  // Split the string into an array of words
  let words = title.split(" ");

  // Capitalize the first letter of each word and join them back into a string
  let formattedString = words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  let SearchWord = title.replace(/ /g, "+") + `+${city}`;


  return (
    <div className="event-slider">
      <div className={classes.eventsOuter}>
        {/* <img className={classes.heartIcon} src="/img/icons/heart.svg" /> */}
        <img className={classes.titleImage} src={image} />
        <div style={{ cursor: "pointer" }}>
          <div className={classes.titleSection}>
            <h2
              onClick={() =>
                (window.location.href = `https://www.google.com/search?q=${SearchWord}`)
              }
            >
              {formattedString}
            </h2>
            <div className={classes.reviewSection}>
              <Link style={{textDecoration: "none"}} to={`/edit-show/${id}/${title}/${city}`}><h3>EDIT</h3></Link>
            </div>
          </div>

          <div className={classes.locationSection}>
            {/* <img src="/img/packages/location_icon.svg" /> */}
            <h3 >
              {city} - {state}
            </h3>
          </div>
          <div className={classes.priceSection}>
            <h2>₹ {price?.toLocaleString("en-IN")}</h2>
            {/* <h3>₹ {strikePrice?.toLocaleString('en-IN')}</h3> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventCard;
