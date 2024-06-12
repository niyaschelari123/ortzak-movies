import React, { useEffect, useState } from "react";
import DefaultSlider from "../DefaultSlider/DefaultSlider";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { database } from "../../firebase";


function TamilMovies() {

    const [movieData, setMovieData] = useState([]);
    const user_email = localStorage.getItem("movielist_email");
    const [loading, setLoading] = useState(false)

    const fetchTamil = async() => {
      setLoading(true);
        const q = query(
          collection(database, `niyaschelari@gmail.com_col`),
          limit(30),
          where("language", "==", 'tamil'),
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

        setLoading(false);
    
        console.log("tamil documents are", documents);
      }
    
      useEffect(()=>{
        fetchTamil();
      },[])


  return (
    <div>
      <DefaultSlider data={movieData} title="tamil" loading = {loading} />
    </div>
  );
}

export default TamilMovies;
