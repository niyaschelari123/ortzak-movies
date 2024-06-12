import { useSelector } from "react-redux";
import Contact from "../components/Contact";
import Form from "../components/Form";
import { selectAuth } from "../redux/Reducers";
import WelcomeBanner from "./welcome-banner/WelcomeBanner";
import Categories from "./categories/Categories";
import MalayalamMovies from "./malayalam-movies/MalayalamMovies";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { database } from "../firebase";
import { useEffect, useState } from "react";
import TamilMovies from "./tamil-movies/TamilMovies";
import Poster from "./Poster/Poster";
import Series from "./series/Series";




function Home() {

  const user_email = localStorage.getItem("movielist_email");
  const value = collection(database, `${user_email}_col`);
  const [movieData, setMovieData] = useState([]);
  const [loading, setLoading] = useState(true)

  const fetchMalayalam = async() => {
    setLoading(true)
    const q = query(
      collection(database, `niyaschelari@gmail.com_col`),
      limit(30),
      where("language", "==", 'malayalam')     
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

    setLoading(false)

    console.log("documents are", documents);
  }

  useEffect(()=>{
    fetchMalayalam();
  },[])


  return (
    <div className="">
      <WelcomeBanner />
      <Categories />
      <MalayalamMovies data = {movieData} loading = {loading} />
      <TamilMovies />
      <Poster image="/img/poster-three.jpg" />
      <Series />
    </div>
  );
}

export default Home;
