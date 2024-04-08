import React, { useEffect, useState } from "react";
import { Modal, Button, Input, message } from "antd";
import classes from "./SignUpModal.module.css";
import { CloseOutlined } from "@ant-design/icons";
import { database } from "../../firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

function SignUpModal({ isVisible, setIsVisible, setVisible }) {
  const value = collection(database, "signindetails");

  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loginDetails, setLoginDetails] = useState([]);

  const getData = async () => {
    const dbVal = await getDocs(value);
    setLoginDetails(dbVal.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getData();
  }, []);

  const handleOk = async () => {
    if (firstName && email && password) {
      console.log("success");

      const dbVal = await getDocs(value);
      const loginDetails = dbVal.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log("login details", loginDetails);

      const index = loginDetails.findIndex((item) => item.email == email);

      if (index == -1) {
        await addDoc(value, {
          firstName: firstName,
          email: email,
          password: password,
          type: 'User',
        });
        message.success("user Added Successfully");

        const emailCollection = collection(database, `${email}_col`);
      await addDoc(emailCollection, { data: "your_data_here" });

        setFirstName();
        setEmail();
        setPassword();
        setIsVisible(false);
      } else {
        message.error("Email Already Associated with Another user");
      }

      // try {
      //     await firebase.auth().createUserWithEmailAndPassword(email, password);
      //     // User signed up successfully
      //     console.log('User signed up successfully');
      //     message.success('User signed up successfully')
      //     setIsVisible(false);
      //   } catch (error) {
      //     setError(error.message);
      //     console.error('Error signing up:', error.message);
      //     message.error('Failed')
      //   }
      // Perform registration or submit form
      // For example: console.log('Registered successfully');
    } else {
      setError("All fields are required");
      // message.error("Please Fill All Fields")
    }
  };

  const handleCancel = () => {
    setFirstName("");
    setEmail("");
    setPassword("");
    setIsVisible(false);
  };

  const handleInputChange = (event, setter) => {
    setter(event.target.value);
    setError(""); // Reset error message when the user starts typing
  };

  console.log("values are", firstName, email, password);

  return (
    <div>
      <Modal
        visible={isVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        closeIcon={
          <CloseOutlined style={{ color: "white", fontWeight: 500 }} />
        }
      >
        <div className="signin-modal">
          <div className={classes.modalOuter}>
            <h1>Let's get you set up!</h1>
            <h3>Register Via Email</h3>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => handleInputChange(e, setFirstName)}
            />
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => handleInputChange(e, setEmail)}
            />
            <input
              className={classes.detailsInput}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => handleInputChange(e, setPassword)}
            />
            <button onClick={handleOk}>Register</button>
            <h4>
              Already have an Account ? Please{" "}
              <span onClick={() => setIsVisible(false)}>Sign In</span>
            </h4>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default SignUpModal;
