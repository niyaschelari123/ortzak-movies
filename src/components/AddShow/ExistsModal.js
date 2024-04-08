import React, { useState } from "react";
import classes from "./ExistsModal.module.css";
import { Button, Modal, message } from "antd";
import { addDoc } from "firebase/firestore";

function ExistsModal({
  existsModal,
  setExistsModal,
  storeMovie,
  formRef,
  values,
  loading,
  setLoading,
  dateValue,
  selectedDate,
  setBaseImages,
  setImages,
  value,
}) {
  const [buttonLoading, setButtonLoading] = useState(false);

  const handleOk = () => {
    setExistsModal(false);
  };

  const handleCancel = () => {
    setExistsModal(false);
  };

  console.log("store movie", storeMovie);

  const clickYes = async () => {
    setButtonLoading(true);
    if (dateValue == "today") {
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
    if (dateValue == "choose date") {
      values.watchedDate = selectedDate;
      delete values["Watched_Date"];
    }
    if (dateValue == "dont remember") {
      values.watchedDate = "Dont Remember";
      delete values["Watched_Date"];
    }
    console.log("Received values:", values);

    await addDoc(value, values);
    message.success("Show Added Successfully");
    formRef.current.resetFields();
    setBaseImages([]);
    setImages([]);
    setLoading(false);
    setButtonLoading(false);
    setExistsModal(false);
  };

  return (
    <Modal
      title="Already Exists"
      visible={existsModal}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={false}
      className={classes.customModal}
    >
      <p>A movie with same name already Exists in the Database</p>
      <div className={classes.modalOuter}>
        <img src={storeMovie?.images ? storeMovie?.images[0] : ""} />
        <div>
          <h5>{storeMovie?.name}</h5>
          <h5>{storeMovie?.year}</h5>
        </div>
      </div>
      <h4>Proceed with the movie you are trying to add ?</h4>
      <div className={classes.buttonDiv}>
        <Button loading={buttonLoading} onClick={clickYes} type="primary">
          Yes
        </Button>
        <Button
          onClick={() => {
            setExistsModal(false);
            formRef.current.resetFields();
          }}
          type="primary"
        >
          No
        </Button>
      </div>
    </Modal>
  );
}

export default ExistsModal;
