import React, { useEffect, useState } from "react";
import classes from "./Animes.module.css";
import { useHistory } from "react-router-dom";
import EventCard from "../EventCard/EventCard";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { database } from "../../../firebase";
import LoadingComponent from "../../../components/LoadingComponent/LoadingComponent";
import FilterComponent from "../FilterComponent/FilterComponent";

function Animes() {
  const history = useHistory();
  const [movieData, setMovieData] = useState([]);
  const user_email = localStorage.getItem("movielist_email");
  const [loading, setLoading] = useState(false);
  const [searchData, setSearchData] = useState("");
  const [searchArray, setSearchArray] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchValue, setSearchValue] = useState(undefined);

  const fetchSeries = async () => {
    setLoading(true);

    let q;

    if(searchValue!=undefined && searchValue!=""){
      q = query(
        collection(database, `${user_email}_col`),
        where("type", "==", "anime"),
        where("name", "==", searchValue)
      );
    }else{
      q = query(
        collection(database, `${user_email}_col`),
        where("type", "==", "anime"),
        limit(52)
      );
    }

    

    try {
      const querySnapshot = await getDocs(q);
      const documents = querySnapshot.docs.map((doc) => ({...doc.data(),id:doc.id}));

      // Filter documents based on whether any field contains the searchData
      // const filteredDocuments = documents.filter((data) => {
      //   for (const key in data) {
      //     if (
      //       data[key]
      //         .toString()
      //         .toLowerCase()
      //         .includes(searchData.toLowerCase())
      //     ) {
      //       return true;
      //     }
      //   }
      //   return false;
      // });

      console.log("filtered documents", documents);

      setMovieData(
        documents.map((data) => ({
          id: data.id,
          title: data.name,
          year: data.year,
          state: data.language,
          genre: data.genre,
          img: data.images[0],
        }))
      );

      setLoading(false);
    } catch (error) {
      console.error("Error fetching documents: ", error);
      setLoading(false);
    }
  };

  console.log("MOVIE DATA IS", movieData);

  useEffect(() => {
    fetchSeries();
  }, [searchValue]);

  console.log("search data is", searchData);

  const fetchSeriesOnSearch = async () => {
    setSearchLoading(true);
    console.log("entered here");

    const q = query(
      collection(database, `movieNames`),
      where("searchId", "==", searchData), // Fetch documents where name starts with searchData
      where("type", "==", 'anime'),
    );

    try {
      const querySnapshot = await getDocs(q);
      const documents = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSearchLoading(false);
      console.log("search documents are", documents);
      setSearchArray(documents);

      // setMovieData(
      //     documents.map((data) => ({
      //         title: data.name,
      //         year: data.year,
      //         state: data.language,
      //         genre: data.genre,
      //         strikePrice: 180000,
      //         review: 4.7,
      //         img: data.images[0],
      //     }))
      // );
    } catch (error) {
      console.error("Error fetching documents: ", error);
    }
  };

  useEffect(() => {
    // if (searchData.length == 2) {
    //   fetchSeriesOnSearch();
    // }
    if(searchData==""){
      setSearchArray([]);
      // setSearchValue(undefined);
    }
  }, [searchData]);

  return (
    <>
      <div className={classes.filterDiv}>
        <FilterComponent
          setSearchData={setSearchData}
          searchArray={searchArray}
          searchLoading={searchLoading}
          setSearchValue = {setSearchValue}
          searchValue = {searchValue}
          fetchSeriesOnSearch={fetchSeriesOnSearch}
        />
      </div>
      {loading && <LoadingComponent />}

      {!loading && movieData?.length > 0 && (
        <>
          <div className={classes.cardsOuter}>
            <div className={classes.cardFlex}>
              {movieData.map((card) => (
                <div className={classes.eventCardWrapper}>
                  <EventCard
                  id={card.id}
                    image={card.img}
                    title={card.title}
                    //   review={card.review}
                    city={card.year}
                    state={card.state}
                    price={card.genre}
                    //   strikePrice={card.strikePrice}
                  />
                </div>
              ))}
            </div>
            {/* <WeddingPagination
        setCurrentPage={setCurrentPage}
        totalItemsCount={totalItemsCount}
        itemsCountPerPage={itemsCountPerPage}
      /> */}
          </div>
        </>
      )}
    </>
  );
}

export default Animes;
