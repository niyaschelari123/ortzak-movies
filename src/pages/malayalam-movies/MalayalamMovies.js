import React, { useEffect, useState } from "react";
import DefaultSlider from "../DefaultSlider/DefaultSlider";

// const data = [
//   {
//     title: "The Dream Arena",
//     city: "Kochi",
//     state: "Kerala",
//     price: 120000,
//     strikePrice: 180000,
//     review: 4.7,
//     img: "https://e0.pxfuel.com/wallpapers/221/706/desktop-wallpaper-memories-2013-prithviraj-sukumaran.jpg",
//   },
//   {
//     title: "The Dream Arena Montreal CarnivalThe Dream Arena Montreal Carnival",
//     city: "Kochi",
//     state: "Kerala",
//     price: 120000,
//     strikePrice: 180000,
//     review: 4.7,
//     img: "https://e0.pxfuel.com/wallpapers/221/706/desktop-wallpaper-memories-2013-prithviraj-sukumaran.jpg",
//   },
//   {
//     title: "The Dream Arena",
//     city: "Kochi",
//     state: "Kerala",
//     price: 120000,
//     strikePrice: 180000,
//     review: 4.7,
//     img: "https://e0.pxfuel.com/wallpapers/221/706/desktop-wallpaper-memories-2013-prithviraj-sukumaran.jpg",
//   },
//   {
//     title: "The Dream Arena Montreal Carnival",
//     city: "Kochi",
//     state: "Kerala",
//     price: 120000,
//     strikePrice: 180000,
//     review: 4.7,
//     img: "https://e0.pxfuel.com/wallpapers/221/706/desktop-wallpaper-memories-2013-prithviraj-sukumaran.jpg",
//   },
//   {
//     title: "The Dream Arena",
//     city: "Kochi",
//     state: "Kerala",
//     price: 120000,
//     strikePrice: 180000,
//     review: 4.7,
//     img: "https://e0.pxfuel.com/wallpapers/221/706/desktop-wallpaper-memories-2013-prithviraj-sukumaran.jpg",
//   },
// ];

function MalayalamMovies({data}) {


  return (
    <div>
      <DefaultSlider data={data} title="Malayalam" />
    </div>
  );
}

export default MalayalamMovies;
