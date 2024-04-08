import React from 'react'
import classes from './Poster.module.css'

function Poster({image}) {
  return (
    <div className = {classes.posterOuter}>
      <img src={image} />
    </div>
  )
}

export default Poster
