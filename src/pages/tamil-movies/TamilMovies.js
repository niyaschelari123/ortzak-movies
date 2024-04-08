import React, { useEffect, useState } from "react";
import DefaultSlider from "../DefaultSlider/DefaultSlider";
import { collection, getDocs, query, where } from "firebase/firestore";
import { database } from "../../firebase";


function TamilMovies() {

    const [movieData, setMovieData] = useState([]);
    const user_email = localStorage.getItem("movielist_email");

    const fetchTamil = async() => {
        const q = query(
          collection(database, `niyaschelari@gmail.com_col`),
          where("language", "==", 'tamil')
        );
    
        // Execute the query to fetch documents with the specified name
        const querySnapshot = await getDocs(q);
    
        // Extract data from the query snapshot
        const documents = querySnapshot.docs.map((doc) => doc.data());
        setMovieData(documents?.map((data)=>({
          
            title: data.name,
            city: data.year,
            state: "Kerala",
            price: data.genre,
            strikePrice: 180000,
            review: 4.7,
            img: data.images[0],
          
        })))
    
        console.log("tamil documents are", documents);
      }
    
      useEffect(()=>{
        fetchTamil();
      },[])


  return (
    <div>
      <DefaultSlider data={movieData} title="tamil" />
    </div>
  );
}

export default TamilMovies;
