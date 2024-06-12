import React, { useEffect, useState } from "react";
import classes from "./SearchPage.module.css";
import { Input, Card } from "antd";
import { database } from "../../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import EventCard from "../SearchPage/EventCard/EventCard";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";

function SearchPage() {
  const [searchValue, setSearchValue] = useState(null);
  const [movieData, setMovieData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [movieLoading, setMovieLoading] = useState(false);
  const [movieToShow, setmovieToShow] = useState([]);

  const user_email = localStorage.getItem("movielist_email");

  const fetchSeries = async () => {
    setLoading(true);

    let q;

    if (searchValue != undefined && searchValue != "") {
      q = query(
        collection(database, `movieNames`),
        where("searchId", "==", searchValue)
      );
    }

    // Execute the query to fetch documents with the specified name
    const querySnapshot = await getDocs(q);

    // Extract data from the query snapshot
    const documents = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    console.log("initial documents", documents);
    if (documents?.length > 0) {
      setLoading(false);
    } else {
      setLoading(false);
    }
    // setMovieData(documents?.map((data)=>({
    //     id: data.id,
    //     title: data.name,
    //     year: data.year,
    //     state: data.language,
    //     genre: data.genre,
    //     strikePrice: 180000,
    //     review: 4.7,
    //     img: data.images[0],

    // })))
    setMovieData(documents.map((data) => data.name));
    setmovieToShow(documents.map((data) => data.name));

    const movies = documents.map((data) => data.name);

    console.log("series documents are", documents);

  };

  console.log("search value", selectedMovie);

  useEffect(() => {
    if (searchValue != null && searchValue != "") {
      setmovieToShow(movieData?.filter((item) => item.includes(searchValue)));
    }
    if(searchValue=="" || searchValue==null){
        setMovieData([])
    }
  }, [searchValue]);

  const fetchMovieWithName = async(name) => {
    setSelectedMovie(null);
    setMovieLoading(true);
    const q = query(
        collection(database, `${user_email}_col`),
        where("name", "==", name)
      );
  
      // Execute the query to fetch documents with the specified name
      const querySnapshot = await getDocs(q);
  
      // Extract data from the query snapshot
      const documents = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
    //   setMovieData(documents?.map((data)=>({
        
    //       title: data.name,
    //       city: data.year,
    //       state: "Kerala",
    //       price: data.genre,
    //       img: data.images[0],
        
    //   })))

    console.log('final documents', documents)
    setSelectedMovie({...documents[0]})
    setMovieLoading(false);
  }

  return (
    <div className={classes.searchOuter}>
      <div className={classes.searchDiv}>
        <Input
          onChange={(e) => setSearchValue(e.target.value)}
          className={classes.searchInuput}
          placeholder="Please Enter atleast 2 Characters"
        />
        <img src="/img/search.png" onClick={fetchSeries} />
      </div>
      {loading ? <LoadingComponent /> : (
      <div className={classes.namesContainer}>
        {movieToShow?.map((item) => (
          <p onClick={()=>fetchMovieWithName(item)}>{item}</p>
        ))}
      </div>
      )}
      {movieLoading ? <LoadingComponent /> : ""}
      {selectedMovie != null && (
      <EventCard
        id={selectedMovie?.id}
        image={selectedMovie?.images ? selectedMovie?.images[0] : ""}
        title={selectedMovie?.name}
        //   review={card.review}
        city={selectedMovie?.year}
        state={selectedMovie?.language}
        price={selectedMovie?.genre}
      />
    )}
    </div>
  );
}

export default SearchPage;
