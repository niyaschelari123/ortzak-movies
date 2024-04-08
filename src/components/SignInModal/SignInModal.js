import React, { useState } from "react";
import { Modal, Button, Input, message } from "antd";
import classes from "./SignInModal.module.css";
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
import SignUpModal from "../Sign-up-modal/SignUpModal";
import { useDispatch } from "react-redux";
import { login } from "../../redux/Reducers";

function SignInModal({ visible, setVisible, setMenuShow, menuShow }) {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const value = collection(database, "signindetails");

  const dispatch = useDispatch();

  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleInputChange = (event, setter) => {
    setter(event.target.value);
  };

  const handleSignIn = async () => {
    if (email && password) {
      const dbVal = await getDocs(value);
      const loginDetails = dbVal.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log("login details", loginDetails);

      const index = loginDetails.findIndex(
        (item) => item.email == email && item.password == password
      );
      if (index == -1) {
        message.error("Invalid Credentials");
      } else {
        message.success("Login Success");
        const loggedUser = loginDetails.filter((item)=>item.email==email);
        const user = {...loggedUser[0]}
        console.log('logged user', user)
        dispatch(login(user));
        localStorage.setItem("movielist_auth_type", user.type);
        localStorage.setItem("movielist_name", user.firstName);
        localStorage.setItem("movielist_email", user.email);
        setVisible(false);
        setMenuShow(!menuShow);
      }
    }else{
        message.error("Please Fill All Fields")
    }
  };

  return (
    <div>
      <Modal
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        closeIcon={
          <CloseOutlined style={{ color: "white", fontWeight: 500 }} />
        }
      >
        <div className="signin-modal">
          <div className={classes.modalOuter}>
            <h1>Welcome Back!</h1>
            <h3>Sign In Via Email</h3>
            <input
              type="text"
              placeholder="Email"
              onChange={(e) => handleInputChange(e, setEmail)}
            />
            <input
              className={classes.detailsInput}
              type="password"
              placeholder="Password"
              onChange={(e) => handleInputChange(e, setPassword)}
            />
            <button onClick={handleSignIn}>Sign In</button>
            <h4>
              Don't have an Account ? Please{" "}
              <span
                onClick={() => {
                  setIsVisible(true);
                }}
              >
                Sign Up
              </span>
            </h4>
          </div>
          <SignUpModal
            isVisible={isVisible}
            setIsVisible={setIsVisible}
            setVisible={setVisible}
          />
        </div>
      </Modal>
    </div>
  );
}

export default SignInModal;
