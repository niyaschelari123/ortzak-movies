import React, { useEffect, useState } from 'react'
import classes from './TvShows.module.css'
import {useHistory} from 'react-router-dom'
import EventCard from '../EventCard/EventCard';
import { collection, getDocs, query, where } from "firebase/firestore";
import { database } from '../../../firebase';
import LoadingComponent from '../../../components/LoadingComponent/LoadingComponent';
import FilterComponent from '../FilterComponent/FilterComponent';


function TvShows() {

    const history = useHistory();
    const [movieData, setMovieData] = useState([]);
    const user_email = localStorage.getItem("movielist_email");
    const [loading, setLoading] = useState(false);
    const [searchData, setSearchData] = useState("");
    const [searchArray, setSearchArray] = useState([]);
    const [searchLoading, setSearchLoading] = useState(false);
    const [searchValue, setSearchValue] = useState(undefined)

    const fetchSeries = async() => {
        setLoading(true);

        let q;

        if(searchValue!=undefined && searchValue!=""){
          q = query(
            collection(database, `${user_email}_col`),
            where("type", "==", "series"),
            where("name", "==", searchValue)
          );
        }else{
          q = query(
            collection(database, `${user_email}_col`),
            where("type", "==", "series")
          );
        }
    
        // Execute the query to fetch documents with the specified name
        const querySnapshot = await getDocs(q);
    
        // Extract data from the query snapshot
        const documents = querySnapshot.docs.map((doc) => ({...doc.data(),id:doc.id}));
        console.log('initial documents', documents)
        if(documents?.length>0){
            setLoading(false)
        }else{
            setLoading(false)
        }
        setMovieData(documents?.map((data)=>({
            id: data.id,
            title: data.name,
            year: data.year,
            state: data.language,
            genre: data.genre,
            strikePrice: 180000,
            review: 4.7,
            img: data.images[0],
          
        })))
    
        console.log("series documents are", documents);
      }
    
      useEffect(()=>{
        fetchSeries();
      },[searchValue])

      const fetchSeriesOnSearch = async () => {
        setSearchLoading(true);
        console.log("entered here");
    
        const q = query(
          collection(database, 'movieNames'),
          where("searchId", "==", searchData),
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
          if(documents.length>0){
            alert(documents[0].name)
          }    
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
    {loading && (<LoadingComponent />)}
    {!loading && movieData?.length>0 && (
    
    <div className={classes.cardsOuter}>
      <div className={classes.cardFlex}>
        {movieData.map((card) => (
          <div className={classes.eventCardWrapper}>
            <EventCard
              id = {card.id}
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
    )}
    </>
  )
}

export default TvShows
