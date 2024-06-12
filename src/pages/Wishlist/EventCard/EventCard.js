import React from "react";
import classes from "./EventCard.module.css";
import { Link, useHistory } from "react-router-dom";
import { DeleteOutlined } from '@ant-design/icons';
import {
    addDoc,
    collection,
    query,
    where,
    deleteDoc,
    doc,
    getDocs,
    updateDoc,
  } from "firebase/firestore";
import { database } from "../../../firebase";
import { Button, Popconfirm, message } from "antd";

function EventCard({
  id,
  image,
  title,
  review,
  city,
  state,
  price,
  type,
  strikePrice,
  loading,
  setLoading,
  handleConfirm,
  deleteFromWishList
}) {
  const history = useHistory();
  
  // Split the string into an array of words
  let words = title.split(" ");

  // Capitalize the first letter of each word and join them back into a string
  let formattedString = words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  let SearchWord = title.replace(/ /g, "+") + `+${city}`;

  const values = {
    id: id,
    name: title,
    year: city,
    language: state,
    genre: price,
    images: [image],
    type: type,
  }
console.log('values in wishlist', id)
  

  return (
    <div className="event-slider">
      <div className={classes.eventsOuter}>
      <Popconfirm
            title="Are you sure you want to delete the movie ?"
            onConfirm={()=>deleteFromWishList(id)}
            okText="Yes"
            cancelText="No"
          >
        <img src="/img/delete-icon.png" className = {classes.deleteButton}/>
        {/* <img className={classes.heartIcon} src="/img/icons/heart.svg" /> */}
        </Popconfirm>
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
              <h3
                onClick={() =>
                  history.push(`/edit-wishlist/${id}/${title}/${city}`)
                }
              >
                EDIT
              </h3>
            </div>
          </div>

          <div className={classes.locationSection}>
            {/* <img src="/img/packages/location_icon.svg" /> */}
            <h3>
              {city} - {state}
            </h3>
          </div>
          <div className={classes.priceSection}>
            <h2>₹ {price?.toLocaleString("en-IN")}</h2>

            {/* <h3>₹ {strikePrice?.toLocaleString('en-IN')}</h3> */}
          </div>
          <Popconfirm
            title="Are you sure you want to change the status to Watched ?"
            onConfirm={()=>handleConfirm(title, values)}
            okText="Yes"
            cancelText="No"
          >
            <Button className={classes.changeStatus}>Change Status</Button>
          </Popconfirm>
        </div>
      </div>
    </div>
  );
}

export default EventCard;
