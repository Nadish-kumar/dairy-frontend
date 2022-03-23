import React from "react";
import "../../assests/Css/Login.css";
import login from "../../assests/img/login1.jpg";
import logo from "../../assests/img/logo1.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import { firebase, auth } from "../../Database/firebase";

const Login = () => {
  const [mynumber, setnumber] = useState("");
  const [otp, setotp] = useState("");
  const [show, setshow] = useState(false);
  const [final, setfinal] = useState("");

  // Sent OTP
  const signin = () => {
    if (mynumber === "" || mynumber.length < 10) return;

    let verify = new firebase.auth.RecaptchaVerifier("recaptcha-container");
    auth
      .signInWithPhoneNumber(mynumber, verify)
      .then((result) => {
        setfinal(result);
        alert("code sent");
        setshow(true);
      })
      .catch((err) => {
        alert(err);
        window.location.reload();
      });
  };

  // Validate OTP
  const ValidateOtp = () => {
    if (otp === null || final === null) return;
    final
      .confirm(otp)
      .then((result) => {
        // success
      })
      .catch((err) => {
        alert("Wrong code");
      });
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-6">
          <img className="login__left" src={login} />
        </div>
        <div className="col-lg-6 login__right">
          <img src={logo} className="login__logo" />
          <p className="heading">Login</p>
          <div>
            <label className="subheading">Phone Number</label>
            <div className="input-group">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={mynumber}
                onChange={(e) => {
                  setnumber(e.target.value);
                }}
              />
              <button className="btn btn-success" onClick={signin}>
                Send OTP
              </button>
            </div>
            <br />
            <div id="recaptcha-container"></div>
            <label className="subheading">OTP</label>
            <input
              type="number"
              className="form-control"
              placeholder="password"
              onChange={(e) => {
                setotp(e.target.value);
              }}
            />
            <br />

            <button
              type="submit"
              onClick={ValidateOtp}
              className="btn btn-success"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
