import React from "react";
import "../../assests/Css/Form.css";
import { useFormik } from "formik";
import axios from "axios";
import { useState } from "react";
import { storage } from "../../Database/firebase";
import { firebase } from "../../Database/firebase";

const Form = () => {
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    if(e.target.files[0]) {
    setImage(e.target.files[0])
      }
  }
console.log(image)
 
const handleUpload =() => {
  const uploadTask = storage.ref(`images/${image.name}`).put(image);
  uploadTask.on(
    "state_changed",
    snapshot => {
      const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      setProgress(progress);
    },
    error => {
      console.log(error);
    },
    () => {
      storage
        .ref("images")
        .child(image.name)
        .getDownloadURL()
        .then(url => {
          setUrl(url);
        });
    }
  );
console.log(url)
}

  const upload = async ()=>{
    var Title = document.getElementById("title").value
    var Des = document.getElementById("desc").value
    var Date = document.getElementById("date").value


    
   



  }

  return (
    <div className="container-fluid form__content">
    
      <form>
    
      </form>
    </div>
  );
};

export default Form;
