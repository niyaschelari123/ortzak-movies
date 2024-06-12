import React, { useEffect, useState } from "react";
import classes from "./WishlistMovies.module.css";
import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import { database } from "../../../firebase";
import LoadingComponent from "../../../components/LoadingComponent/LoadingComponent";
import EventCard from "../EventCard/EventCard";
import { BrowserRouter as Router } from "react-router-dom";
import { message } from "antd";
import ExistsModal from "../../../components/AddShow/ExistsModal";

function WishListMovies({ selectedShow, setSelectedShow }) {
  const [movieData, setMovieData] = useState([]);
  const user_email = localStorage.getItem("movielist_email");
  const [loading, setLoading] = useState(false);
  const [searchData, setSearchData] = useState("");
  const [searchArray, setSearchArray] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchValue, setSearchValue] = useState(undefined);
  const [statusLoading, setStatusLoading] = useState(false);

  const [existsModal, setExistsModal] = useState(false);
  const [storeMovie, setStoreMovie] = useState({});
  const [storeData, setStoreData] = useState({});

  const movieValue = collection(database, "movieNames");
  const value = collection(database, `${user_email}_col`);

  const fetchSeries = async () => {
    setLoading(true);

    let q = query(
      collection(database, `${user_email}_wishlist`),
      where("type", "==", selectedShow)
    );

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
    setMovieData(
      documents?.map((data) => ({
        id: data.id,
        title: data.name,
        year: data.year,
        state: data.language,
        genre: data.genre,
        strikePrice: 180000,
        review: 4.7,
        img: data.images[0],
        type: data.type,
      }))
    );

    console.log("series documents are", documents);
  };

  useEffect(() => {
    fetchSeries();
  }, [selectedShow]);

  console.log("movie data is", movieData);

  const handleConfirm = async (title, values) => {
    // Handle confirmation

    const q = query(
      collection(database, `${user_email}_col`),
      where("name", "==", title)
    );

    // Execute the query to fetch documents with the specified name
    const querySnapshot = await getDocs(q);

    // Extract data from the query snapshot
    const documents = querySnapshot.docs.map((doc) => doc.data());

    console.log("documents are", documents);

    if (documents?.length > 0) {
      setStoreMovie({ ...documents[0] });
      setStoreData(values);
      setExistsModal(true);
    } else {
      const today = new Date();
      const options = {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      const formattedDate = today.toLocaleString("en-GB", options);
      values.watchedDate = formattedDate;

      console.log("Received values:", values);

      let formattedStrings = values?.name?.toLowerCase()?.substring(0, 2);
      await addDoc(movieValue, {
        searchId: formattedStrings,
        name: values.name,
        type: values?.type,
      });

      if (user_email.includes("@gmail")) {
        await addDoc(value, values);
        const deleteVal = doc(database, `${user_email}_wishlist`, values.id);
        await deleteDoc(deleteVal);
        message.success("Show Added Successfully");
        fetchSeries();
        setLoading(false);
      } else {
        message.error("invalid Email");
      }
    }
  };

  const deleteFromWishList = async (id) => {
    console.log('preparing to delte')
    const deleteVal = doc(database, `${user_email}_wishlist`, id);
    await deleteDoc(deleteVal);
    message.success("Movie Removed Successfully")
    fetchSeries();
  };

  return (
    <>
      {loading && <LoadingComponent />}
      {!loading && movieData?.length==0 && (
        <h4 className={classes.noMovie}>No Movies Found</h4>
      )}
      {!loading && movieData?.length > 0 && (
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
                  type={card.type}
                  loading={statusLoading}
                  setLoading={setStatusLoading}
                  handleConfirm={handleConfirm}
                  deleteFromWishList = {deleteFromWishList}
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
      <ExistsModal
        storeMovie={storeMovie}
        existsModal={existsModal}
        setExistsModal={setExistsModal}
        values={storeData}
        loading={loading}
        setLoading={setLoading}
        // dateValue={dateValue}
        // selectedDate={selectedDate}
        value={value}
        type="wishlist"
      />
    </>
  );
}

export default WishListMovies;
