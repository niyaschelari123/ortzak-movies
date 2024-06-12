import React, { useEffect, useState } from "react";
import classes from "./WatchHistory.module.css";
import { database } from "../../firebase";
import { collection, getDocs, query } from "firebase/firestore";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";

function WatchHistory() {
  const user_email = localStorage.getItem("movielist_email");
  const [loading, setLoading] = useState(true);
  const [movieData, setMovieData] = useState([]);

  // Function to convert date string to a comparable Date object
  function parseDate(dateString) {
    console.log("date string value", dateString);
    // Split the date string by '/'
    let [day, month, year] = dateString.split("/");
    // Return a new Date object (Note: Month is 0-based in Date constructor)
    return new Date(year, month - 1, day);
  }

  const fetchMovies = async () => {
    setLoading(true);
    const q = query(collection(database, `${user_email}_col`));

    // Execute the query to fetch documents with the specified name
    const querySnapshot = await getDocs(q);

    // Extract data from the query snapshot
    const documents = querySnapshot.docs.map((doc) => doc.data());
    const arrayOne = documents?.map((data) => ({
      title: data.name,
      city: data.year,
      price: data.genre,
      strikePrice: 180000,
      img: data.images[0],
      type: data.type,
      watched_date: data?.watchedDate,
    }));

    const withoutDontRemember = arrayOne
      .filter((item) => item.watched_date !== "Dont Remember")
      .map((item) => {
        // Convert date from DD-MM-YYYY to DD/MM/YYYY if necessary
        let formattedDate = item.watched_date.replace(/-/g, "/");
        return { ...item, watched_date: formattedDate.slice(0, 10) };
      });

    const withDontRemember = arrayOne.filter(
      (item) => item.watched_date == "Dont Remember"
    );

    console.log("without dont remember", withDontRemember);

    const sortData = withoutDontRemember.sort(
      (a, b) => parseDate(b.watched_date) - parseDate(a.watched_date)
    );

    setMovieData([...sortData, ...withDontRemember]);

    setLoading(false);

    console.log("watch history documents are", documents);
  };

  console.log("movie data is", movieData);

  useEffect(() => {
    fetchMovies();
  }, []);

  // Custom comparison function
  function compareDates(a, b) {
    const dateA = a.watched_date.slice(0, 10);
    const dateB = b.watched_date.slice(0, 10);

    // Handle 'dont remember' case
    if (dateA === "Dont Remember" && dateB === "Dont Remember") {
      return 0;
    } else if (dateA === "Dont Remember") {
      return 1;
    } else if (dateB === "Dont Remember") {
      return -1;
    }

    // Convert to Date objects for comparison
    const dateObjA = new Date(dateA);
    const dateObjB = new Date(dateB);

    // console.log('conversion dates x', dateObjA, dateObjB)

    // Compare dates (latest first)
    return dateObjB - dateObjA;
  }

  return (
    <>
      <div className={classes.watchOuter}>
        <h2>Watch History</h2>
        {!loading && movieData?.length != 0 && (
          <table className={classes.watchTable}>
            <thead>
              <tr>
                <th className={classes.tableTitle}>Name</th>
                <th className={classes.tableType}>Type</th>
                <th className={classes.tableImg}>Image</th>
              </tr>
            </thead>
            <tbody>
              {movieData?.length > 0 &&
                movieData.map((item) => (
                  <tr>
                    <td className={classes.tableTitle}>
                      {item.title}{" "}
                      {item.watched_date !== "Dont Remember"
                        ? `(${item.watched_date})`
                        : ""}
                    </td>
                    <td className={classes.tableType}>
                      {item.type && item.type}
                    </td>
                    <td className={classes.tableImg}>
                      {item?.img && <img src={item.img} />}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>

      {loading && <LoadingComponent />}
    </>
  );
}

export default WatchHistory;
