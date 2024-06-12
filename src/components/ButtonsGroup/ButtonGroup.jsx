import React, { useState } from 'react';
import classes from './ButtonGroup.module.css'

const ButtonGroup = ({ buttonCount, buttonTexts, onClickFunctions }) => {
  const [selectedButton, setSelectedButton] = useState(0);

  const handleButtonClick = (index) => {
    setSelectedButton(index);
    onClickFunctions[index]();
  };

  return (
    <div className = {classes.buttonsWrapper}>
      {Array.from({ length: buttonCount }, (_, index) => (
        <button
          key={index}
          onClick={() => handleButtonClick(index)}
          style={{
            backgroundColor: selectedButton === index ? '#F66' : 'white',
            border: selectedButton === index ? 'none' : '1px solid #535353',
            color: selectedButton === index ? 'white' : 'black',
          }}
        >
          {buttonTexts[index]}
        </button>
      ))}
    </div>
  );
};

export default ButtonGroup;
