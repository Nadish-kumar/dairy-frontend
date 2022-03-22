import React from "react";
import "../../assests/Css/Signup.css";
import signup from "../../assests/img/sign1.jpg";
import logo from "../../assests/img/logo1.png";

const Sign = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-6">
          <img className="sign__left" src={signup} />
        </div>
        <div className="col-lg-6 sign__right">
          <img className="sign__logo" src={logo} />
          <p className="heading">Signup</p>
          <div>
            <label className="subheading">Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your name"
            />
            <br />
            <label className="subheading">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
            />
            <br />
            <label className="subheading">password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
            />
            <br />
            <label className="subheading">phone number</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter your phone number"
            />
            <br />
            <button className="btn btn-success btn-large">Sign-up</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sign;
