import React from "react";
import "../../assests/Css/Login.css";
import login from "../../assests/img/login1.jpg";
import logo from "../../assests/img/logo1.png";
import { Link } from "react-router-dom";
import { useState } from "react";

const Login = () => {
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
            <label className="subheading">Email</label>

            <input type="email" className="form-control" placeholder="Email" />

            <br />
            <label className="subheading">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="password"
            />
            <br />
            <Link to="/dashboard">
              <button type="submit" className="btn btn-success">
                Login
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
