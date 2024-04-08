import React, { useEffect, useRef, useState } from "react";
import classes from "./EditShow.module.css";
import {
  Form,
  Input,
  Button,
  Upload,
  Select,
  Card,
  Modal,
  message,
  DatePicker,
  Radio,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import {
  addDoc,
  collection,
  query,
  where,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { database } from "../../firebase";
import ExistsModal from "../../components/AddShow/ExistsModal";
import { useHistory, useParams } from "react-router-dom";
import moment from "moment";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";

const movieGenres = [
  "Action",
  "Adventure",
  "Animation",
  "Comedy",
  "Crime",
  "Drama",
  "Fantasy",
  "Historical",
  "Horror",
  "Musical",
  "Mystery",
  "Romance",
  "Science Fiction",
  "Sports",
  "Thriller",
  "War",
  "Western",
  "Documentary",
  "Biography",
  "Family",
  "Superhero",
  "Martial Arts",
  "Spy",
  "Disaster",
  "Teen",
  "Holiday",
  "Noir",
  "Surreal",
  "Independent",
  "Experimental",
];

const languageArray = [
  { value: "english", label: "English" },
  { value: "malayalam", label: "Malayalam" },
  { value: "tamil", label: "Tamil" },
  { value: "telugu", label: "Telugu" },
  { value: "hindi", label: "Hindi" },
  { value: "kannada", label: "Kannada" },
  { value: "japanese", label: "Japanese" },
  { value: "korean", label: "Korean" },
  { value: "spanish", label: "Spanish" },
  { value: "russian", label: "Russian" },
  { value: "other", label: "other" },
];

function EditShow() {
  const { Option } = Select;

  const history = useHistory();

  const { id, title, year } = useParams();
  console.log("id value is", id, title, year);

  const [movieData, setMovieData] = useState([]);
  const [list, setList] = useState({});
  const [watchedDay, setWatchedDay] = useState(null);
  const [baseImages, setBaseImages] = useState([]);
  const [currentDate, setCurrentDate] = useState(null);

  const fetchSeries = async () => {
    setMovieLoading(true);

    let q;

    q = query(
      collection(database, `${user_email}_col`),
      where("name", "==", title),
      where("year", "==", year)
    );

    // Execute the query to fetch documents with the specified name
    const querySnapshot = await getDocs(q);

    // Extract data from the query snapshot
    const documents = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    console.log("single movie data", documents);
    if (documents?.length > 0) {
      setMovieLoading(false);
    } else {
      setMovieLoading(false);
    }
    setMovieData(
      documents?.map((data) => ({
        id: data.id,
        searchIndex: data?.searchIndex,
        title: data.name,
        year: data.year,
        language: data.language,
        genre: data.genre,
        img: data.images[0],
        type: data?.type,
        Watched_Date: data?.watchedDate?.toLowerCase(),
      }))
    );

    const movie = documents?.map((data) => ({
      id: data.id,
      title: data.name,
      year: data.year,
      state: data.language,
      genre: data.genre,
      img: data.images[0],
      type: data?.type,
    }));

    setList(movie[0]);

    console.log("series documents are", documents);
  };

  useEffect(() => {
    fetchSeries();
  }, []);

  console.log("list is", movieData, baseImages);

  useEffect(() => {
    if (movieData[0]?.Watched_Date) {
      setWatchedDay(movieData[0]?.Watched_Date);
      setCurrentDate(movieData[0]?.Watched_Date);
    }

    if (movieData[0]?.img) {
      setBaseImages([movieData[0]?.img]);
    }

    let formattedString;

    if (movieData[0]?.title) {
      let title = movieData[0]?.title;
      console.log("title value is", title);
      // Split the string into an array of words
      let words = title?.split(" ");

      // Capitalize the first letter of each word and join them back into a string
      formattedString = words
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    }

    formRef.current.setFieldsValue({
      name: formattedString,
      year: movieData[0]?.year,
      Watched_Date: movieData[0]?.watched_Date,
      genre: movieData[0]?.genre,
      language: movieData[0]?.language,
      type: movieData[0]?.type,

      // Add other field names and their corresponding values here
    });
  }, [movieData]);

  const user_email = localStorage.getItem("movielist_email");
  const value = collection(database, `${user_email}_col`);

  console.log("user email is", user_email, value);

  //movieadd

  const [images, setImages] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [dateValue, setDateValue] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);
  const [existsModal, setExistsModal] = useState(false);
  const [storeMovie, setStoreMovie] = useState({});
  const [storeData, setStoreData] = useState({});
  const [movieLoading, setMovieLoading] = useState(false);

  const handleDateChange = (date, dateString) => {
    setSelectedDate(dateString);
    setCurrentDate(dateString);
  };

  const handleChange = ({ fileList }) => {
    // Convert each image file to base64 format
    const promises = fileList.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    });

    Promise.all(promises)
      .then((base64Images) => {
        // Set the base64 images to state
        setBaseImages(base64Images);
        // Set the file objects to state
        setImages(fileList);
      })
      .catch((error) => {
        console.error("Error converting images to base64:", error);
      });
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  const handleCancel = () => setPreviewVisible(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
  };

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const onFinish = async (values) => {
    values.images = baseImages;
    values.name = values.name.toLowerCase();
    setLoading(true);

    const q = query(
      collection(database, `${user_email}_col`),
      where("name", "==", values?.name)
    );

    // Execute the query to fetch documents with the specified name
    const querySnapshot = await getDocs(q);

    // Extract data from the query snapshot
    const documents = querySnapshot.docs.map((doc) => doc.data());

    console.log("documents are", documents, watchedDay);

    // const dbVal = await getDocs(value);
    // const movieDetails = dbVal.docs.map((doc) => ({
    //   ...doc.data(),
    //   id: doc.id,
    // }));
    // console.log("login details", movieDetails, values.name);

    // const findInde = movieDetails.findIndex(
    //   (item) => item.name.toLowerCase() == values.name.toLowerCase()
    // );
    // console.log("find inde value", findInde);

    if (
      documents?.length > 0 &&
      (values?.name).toLowerCase() != (movieData[0]?.title).toLowerCase()
    ) {
      setStoreMovie({ ...documents[0] });
      setStoreData(values);
      setExistsModal(true);
    } else {
      if (watchedDay == "today") {
        console.log("watched day is today");
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
        delete values["Watched_Date"];
      }
      if (watchedDay != "dont remember" && watchedDay != "today") {
        console.log("watched day is choose date");
        values.watchedDate = currentDate;
        delete values["Watched_Date"];
      }
      if (watchedDay == "dont remember") {
        console.log("watched day is dont remember");
        values.watchedDate = "Dont Remember";
        delete values["Watched_Date"];
      }

      if (!movieData[0]?.searchIndex) {
        values.searchIndex = (values.name)?.toLowerCase()?.substring(0, 2);
      }

      console.log("Received values:", values);

      const updatedData = doc(database, `${user_email}_col`, id);
      await updateDoc(updatedData, values);

      message.success("Show Edited Successfully");

      setLoading(false);
      history.push(`/edit-show/${id}/${values.name}/${values.year}`);
    }
  };

  const layout = {
    labelCol: {
      span: 24, // This spans the entire width for the label column
    },
    wrapperCol: {
      span: 24, // This spans the entire width for the input column
    },
  };

  console.log("images are", baseImages);

  const onChangeDate = (e) => {
    setDateValue(e.target.value);
  };

  return (
    <>
      {movieLoading ? (
        <LoadingComponent />
      ) : (
        <div className={classes.addShowOuter}>
          <h2>Edit Show</h2>
          <Form
            ref={formRef}
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please input the name!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Year"
              name="year"
              rules={[{ required: true, message: "Please input the year!" }]}
            >
              <Input type="number" />
            </Form.Item>
            <Form.Item
              label="watched_date"
              name="Watched_Date"
              //   rules={[{ required: true, message: "Please input the Date!" }]}
              rules={[
                // Add required rule conditionally
                currentDate == null
                  ? { required: true, message: "Please input the Date!" }
                  : null,
                // Add other static rules as needed
              ].filter((rule) => rule !== null)}
            >
              <Radio.Group onChange={onChangeDate} defaultValue={watchedDay}>
                <div
                  className={classes.radioFlex}
                  style={{ marginBottom: "10px" }}
                >
                  <img
                    className={classes.radioButton}
                    onClick={() => setWatchedDay("dont remember")}
                    src={
                      watchedDay == "dont remember"
                        ? "/img/icons/radio-checked.png"
                        : "/img/icons/radio-unchecked.png"
                    }
                  />
                  <p>Dont Remember</p>
                </div>
                <div
                  className={classes.radioFlex}
                  style={{ marginBottom: "10px" }}
                >
                  <img
                    onClick={() => setWatchedDay("today")}
                    className={classes.radioButton}
                    src={
                      watchedDay == "today"
                        ? "/img/icons/radio-checked.png"
                        : "/img/icons/radio-unchecked.png"
                    }
                  />
                  <p>Today</p>
                </div>
                <div
                  className={classes.radioFlex}
                  style={{ marginBottom: "10px" }}
                >
                  <img
                    onClick={() => setWatchedDay("choose date")}
                    className={classes.radioButton}
                    src={
                      watchedDay != "dont remember" && watchedDay != "today"
                        ? "/img/icons/radio-checked.png"
                        : "/img/icons/radio-unchecked.png"
                    }
                  />
                  <p>Choose Date</p>
                </div>
              </Radio.Group>
              {watchedDay != "dont remember" && watchedDay != "today" && (
                <div className={classes.datePickerDiv}>
                  <DatePicker
                    onChange={handleDateChange}
                    format="DD-MM-YYYY HH:mm:ss"
                    showTime
                    defaultDateTimeValue={moment(watchedDay)}
                  />
                  <p>Current : {currentDate}</p>
                </div>
              )}
            </Form.Item>

            <Form.Item
              label="Images"
              name="images"
              rules={[
                // Add required rule conditionally
                baseImages?.length == 0
                  ? { required: true, message: "Please upload images!" }
                  : null,
                // Add other static rules as needed
              ].filter((rule) => rule !== null)}
            >
              <Card className={classes.imageCard}>
                <Upload
                  name="images"
                  listType="picture-card"
                  accept="image/png, image/jpeg, image/jpg, image/gif, image/bmp, image/webp, image/svg+xml"
                  fileList={baseImages?.map((image, index) => ({
                    uid: `-${index}`,
                    name: `image-${index}`,
                    status: "done",
                    url: image, // Use base64 data as the image URL
                  }))}
                  onPreview={handlePreview}
                  onChange={handleChange}
                  multiple
                  beforeUpload={() => false} //not to trigger upload when selecting images
                >
                  {uploadButton}
                </Upload>
                <Modal
                  visible={previewVisible}
                  footer={null}
                  onCancel={handleCancel}
                >
                  <img
                    alt="Preview"
                    style={{ width: "100%" }}
                    src={previewImage}
                  />
                </Modal>
              </Card>
            </Form.Item>

            <Form.Item
              label="Genre"
              name="genre"
              rules={[{ required: true, message: "Please select a genre!" }]}
            >
              <Select
                showSearch // Enable search feature
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                } // Filter options based on input className={classes.customSelect}>
                className={classes.customSelect}
              >
                {movieGenres.map((item) => (
                  <Option value={item}>{item}</Option>
                ))}
                {/* Add more options as needed */}
              </Select>
            </Form.Item>
            <Form.Item
              label="Language"
              name="language"
              rules={[{ required: true, message: "Please select a Language!" }]}
            >
              <Select
                showSearch // Enable search feature
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                } // Filter options based on input className={classes.customSelect}>
                className={classes.customSelect}
              >
                {languageArray.map((item) => (
                  <Option value={item.value}>{item.label}</Option>
                ))}
                {/* Add more options as needed */}
              </Select>
            </Form.Item>
            <Form.Item
              label="Type"
              name="type"
              rules={[{ required: true, message: "Please select a Type!" }]}
            >
              <Select
                className={classes.customSelect}
                showSearch // Enable search feature
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                } // Filter options based on input className={classes.customSelect}>
              >
                <Option value="movies">Movies</Option>
                <Option value="series">Series</Option>
                <Option value="anime">Anime</Option>

                {/* Add more options as needed */}
              </Select>
            </Form.Item>

            <Form.Item>
              <Button loading={loading} type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
          <ExistsModal
            storeMovie={storeMovie}
            existsModal={existsModal}
            setExistsModal={setExistsModal}
            formRef={formRef}
            values={storeData}
            loading={loading}
            setLoading={setLoading}
            dateValue={dateValue}
            selectedDate={selectedDate}
            setBaseImages={setBaseImages}
            setImages={setImages}
            value={value}
          />
        </div>
      )}
    </>
  );
}

export default EditShow;
