import React from "react";
import "../../assests/Css/Form.css";
import { useFormik } from "formik";
import axios from "axios";
import { useState } from "react";
import storage from "../../Database/firebase";

const Form = () => {
  const [image, setImage] = useState("");

  const upload = () => {
    if (image == null) return;
    storage
      .ref(`/images/${image.name}`)
      .put(image)
      .on("state_changed", alert("success"), alert);
  };

  return (
    <div className="container-fluid form__content">
      <div className="row">
        <div className="col-lg-12 heading">
          <p>Create your Memories</p>
        </div>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="row inputboxes">
          <div className="col-lg-3"></div>
          <div className=" col-lg-6 inputlevels">
            <label className="subheading">Title</label>
            <input
              type="text"
              placeholder="Enter your title"
              className="form-control"
              name="title"
            ></input>
            <br />
            <label className="subheading">Image</label>
            <input
              type="file"
              placeholder="Enter your url"
              className="form-control"
              name="image"
              onChange={(e) => {
                setImage(e.target.files[0]);
              }}
            />
            <br />
            <label className="subheading">Comments</label>
            <div class="form-floating">
              <textarea
                class="form-control"
                placeholder="Leave a comment here"
                id="floatingTextarea2"
              ></textarea>
              <label for="floatingTextarea2">Comments</label>
            </div>
            <button
              className="btn btn-success btn-lg mt-3"
              type="submit"
              onClick={upload}
            >
              Post
            </button>
          </div>
          <div className="col-lg-3"></div>
        </div>
      </form>
    </div>
  );
};

export default Form;
