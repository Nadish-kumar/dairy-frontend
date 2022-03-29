import React from "react";
import "../../assests/Css/Signup.css";
import signup from "../../assests/img/sign1.jpg";
import logo from "../../assests/img/logo1.png";
import { useFormik } from "formik";
import { useState } from "react";
import { Typography, Box, TextField, Button } from "@material-ui/core";
import { Modal } from "@material-ui/core";
import { firebase, auth } from "../../Database/firebase";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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

const Sign = () => {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const handleClose = () => setOpen(false);
  const [otp, setotp] = useState("");
  const [final, setfinal] = useState("");
  const [userdata, setvalues] = useState("");

  const loginchange = () => {
    sessionStorage.setItem("type", "login");
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
    },

    onSubmit: async (values) => {
      setvalues(values);
      var user = await axios
        .get("https://dairy-coder.herokuapp.com/userslist")
        .then((res) => {
          return res.data;
        });
      console.log(values);
      const checkuser = await user.filter((data) => {
        return data.phone === parseInt(values.phone);
      });
      console.log(checkuser);
      if (checkuser.length === 0) {
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
        alert("This Number Already Register..");
      }
    },
  });
  const ValidateOtp = async () => {
    if (otp === null || final === null) return;
    final
      .confirm(otp)
      .then(async (result) => {
        alert("success");
        var usercreate = await axios
          .post("https://dairy-coder.herokuapp.com/usersadded", userdata)
          .then((res) => {
            return res.data;
          });
        if (usercreate != null) {
          sessionStorage.setItem("userid", usercreate._id);
          navigate("/dashboard");
        }
      })
      .catch((err) => {
        alert("Wrong code");
      });
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-6">
          <img className="sign__left" src={signup} />
        </div>
        <div className="col-lg-6 sign__right">
          <img className="sign__logo" src={logo} />
          <p className="heading">Signup</p>
          <form onSubmit={formik.handleSubmit}>
            <div>
              <label className="subheading">Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your name"
                name="name"
                onChange={formik.handleChange}
                value={formik.values.name}
              />
              <br />
              <label className="subheading">Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                name="email"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              <br />
              <label className="subheading">phone number</label>
              <div className="input-group">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter your phone number"
                  name="phone"
                  onChange={formik.handleChange}
                  value={formik.values.phone}
                />
                <button className="btn btn-success" type="submit">
                  send OTP
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
                      onClick={ValidateOtp}
                      className="otp__button"
                    >
                      Verify OTP
                    </Button>
                  </Box>
                </Modal>
              </div>
              <button className="btn btn-success btn-large">Sign-up</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Sign;
// https://dairy-memory.herokuapp.com