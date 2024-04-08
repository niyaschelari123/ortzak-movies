import React, { useEffect, useState } from "react";
import DefaultSlider from "../DefaultSlider/DefaultSlider";
import { collection, getDocs, query, where } from "firebase/firestore";
import { database } from "../../firebase";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";


function Series() {

    const [movieData, setMovieData] = useState([]);
    const user_email = localStorage.getItem("movielist_email");
    const [loading, setLoading] = useState(false);

    const fetchSeries = async() => {
        setLoading(true);
        const q = query(
          collection(database, `niyaschelari@gmail.com_col`),
          where("type", "==", 'series')
        );
    
        // Execute the query to fetch documents with the specified name
        const querySnapshot = await getDocs(q);
    
        // Extract data from the query snapshot
        const documents = querySnapshot.docs.map((doc) => doc.data());
        if(documents?.length>0){
            setLoading(false);
        }
        setMovieData(documents?.map((data)=>({
          
            title: data.name,
            city: data.year,
            state: "Kerala",
            price: data.genre,
            strikePrice: 180000,
            review: 4.7,
            img: data.images[0],
          
        })))
    
        console.log("series documents are", documents);
      }
    
      useEffect(()=>{
        fetchSeries();
      },[])


  return (
    <div>
      <DefaultSlider data={movieData} title="Series" />
    </div>
  );
}

export default Series;

