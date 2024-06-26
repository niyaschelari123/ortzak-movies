import React, { useState } from 'react';
import classes from './Wishlist.module.css'
import ButtonGroup from '../../components/ButtonsGroup/ButtonGroup';
import WishListMovies from './WishlistMovies/WishlistMovies';

function Wishlist() {

  const [selectedShow, setSelectedShow] = useState("movies");

  const handleButtonClick1 = () => {
    setSelectedShow("movies")
  }

  const handleButtonClick2 = () => {
    setSelectedShow("series")
  }

  const handleButtonClick3 = () => {
    setSelectedShow("anime")
  }

  const handleButtonClick4 = () => {
    setSelectedShow("documentary")
  }

  return (
    <div className={classes.wishListouter}>
      <div className = {classes.wishListButtons}>
      <ButtonGroup
          buttonCount={4}
          buttonTexts={["Movies", "Series","Anime","Documentary"]}
          onClickFunctions={[handleButtonClick1, handleButtonClick2, handleButtonClick3, handleButtonClick4 ]}
        />
      </div>
      <WishListMovies selectedShow={selectedShow} setSelectedShow={setSelectedShow} />
    </div>
  );
}

export default Wishlist;
