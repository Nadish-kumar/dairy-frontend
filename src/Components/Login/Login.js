import React from "react";
import "../../assests/Css/Login.css";
import login from "../../assests/img/login1.jpg";
import logo from "../../assests/img/logo1.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import { firebase, auth } from "../../Database/firebase";
import { useFormik } from "formik";
import { Modal } from "@material-ui/core";
import { Typography, Box, TextField, Button } from "@material-ui/core";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  height: 500,
  bgcolor: "#f9f9fb",
  border: "2px solid #000",
  borderRadius: "35px",
  boxShadow: 24,
  p: 4,
  textAlign: "center",
};

const Login = () => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const [otp, setotp] = useState("");
  const [final, setfinal] = useState("");
  const [uservalue, setuservalue] = useState("");

  const signupchange = () => {
    sessionStorage.setItem("type", "signup");
  };

  const formik = useFormik({
    initialValues: {
      phone: "",
      password: "",
    },

    onSubmit: async (values) => {
      var user = await axios
        .get("http://localhost:8001/userslist")
        .then((res) => {
          return res.data;
        });
      const checkuser = await user.filter((data) => {
        return data.phone === parseInt(values.phone);
      });
      if (checkuser.length !== 0) {
        setuservalue(checkuser[0]);
        var finalnumber = "+91" + values.phone;
        let verify = new firebase.auth.RecaptchaVerifier("recaptcha-container");
        auth
          .signInWithPhoneNumber(finalnumber, verify)
          .then((result) => {
            setfinal(result);
            alert("code sent");
            setOpen(true);
          })
          .catch((err) => {
            alert(err);
            window.location.reload();
          });
      } else {
        alert("Not Valid User..please Register");
      }
    },
  });
  const ValidateOtp = () => {
    if (otp === null || final === null) return;
    final
      .confirm(otp)
      .then((result) => {
        alert("login successfully");
        sessionStorage.setItem("userid", uservalue._id);
        navigate("/dashboard");
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
          <form onSubmit={formik.handleSubmit}>
            <div>
              <label className="subheading">Phone Number</label>
              <div className="input-group">
                <input
                  type="number"
                  className="form-control"
                  placeholder="phone"
                  onChange={formik.handleChange}
                  value={formik.values.phone}
                  name="phone"
                />
                <button className="btn btn-success" type="submit">
                  Send OTP
                </button>
              </div>
              <br />
              <div id="recaptcha-container"></div>
              <div>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <Typography
                      id="modal-modal-title"
                      variant="h6"
                      component="h2"
                      className="otp__header"
                    >
                      OTP Verification
                    </Typography>

                    <TextField
                      id="standard-basic"
                      variant="standard"
                      className="otp__number"
                      onChange={(e) => {
                        setotp(e.target.value);
                      }}
                    />
                    <Typography
                      id="modal-modal-description"
                      sx={{ mt: 2 }}
                      className="otp__subheading"
                    >
                      If you doesn't receive code<span> Resend</span>
                    </Typography>

                    <Button
                      variant="contained"
                      className="otp__button"
                      onClick={ValidateOtp}
                    >
                      Login
                    </Button>
                  </Box>
                </Modal>
              </div>

              <button
                type="submit"
                onClick={ValidateOtp}
                className="btn btn-success"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
