import React from 'react'
import "../../assests/Css/Dashboard.css";
import { useState } from "react";
import { storage } from "../../Database/firebase";
import { firebase } from "../../Database/firebase";
import { Modal } from "@material-ui/core";
import { Typography, Box, TextField, Button } from "@material-ui/core";
import axios from "axios"
import {useEffect } from "react"
import {useNavigate } from "react-router-dom"
import moment from "moment"

const Form = () => {
  const navigate = useNavigate()
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const [imageurl, setimageurl] = useState(null);
  const [cards, setcards] = useState([])

  const getimgaeurl = async () => {
    var file = document.getElementById("image").files;
    let file11 = new Promise((resolve, reject) => {
      var storageRef = firebase.storage().ref("profile/" + file[0].name);
      storageRef.put(file[0]).then(function (snapshot) {
        storageRef.getDownloadURL().then(function (url) {
          //img download link ah ketakiradhu
          setTimeout(() => resolve(url), 1000);
        });
      });
    });
    var imgurl = await file11;
    console.log(imgurl)
    setimageurl(imgurl);
   
  };
  console.log(imageurl)


  
  const postform = async() => {
    var Title = document.getElementById("title").value
    var Des = document.getElementById("desc").value
    var Date = document.getElementById("date").value
    var id = sessionStorage.getItem("userid")
    
    console.log(id)
    console.log(imageurl)
  
    var data = {
      title: Title,
     userid:id,
     image:imageurl,
    desc: Des,
    date:Date
  }
  console.log(data)
  var response = await axios.post("https://dairy-coder.herokuapp.com/list",data).then((res) => { return res.data})
  console.log(response)
  
 navigate("/dashboard")
  }
  
  return (
    <div className='container'>
      <div className='row ref__heading'>
        <p>Post your Memories</p>
    
      </div>
      <div className='row'>
        <div className='col-md-3'></div>
        <div className='col-md-6'>
        <label className="subheading">Title</label>
            <input
              type="text"
              placeholder="Enter your title"
              className="form-control"
              name="title"
              id="title"
            ></input>
            <br />
        </div>
        <div className='col-md-3'></div>
      </div>
      <div className='row'>
        <div className='col-md-3'></div>
        <div className='col-md-6'>
        <label className="subheading">Image</label>
            <div className="input-group">
              <input
                type="file"
                placeholder="Enter your url"
                className="form-control"
                name="image"
                id="image"
                onChange={getimgaeurl}
              />
             
            </div>
            <br />
        </div>
        <div className='col-md-3'></div>
      </div>
      <div className='row'>
        <div className='col-md-3'></div>
        <div className='col-md-6'>
        <label className="subheading">Comments</label>
            <div class="form-floating">
              <textarea
                class="form-control"
                placeholder="Leave a comment here"
                id="desc"
              ></textarea>
              <label for="floatingTextarea2">Comments</label>
            </div>
        </div>
        <div className='col-md-3'></div>
      </div>
      <div className='row'>
        <div className='col-md-3'></div>
        <div className='col-md-6'>
        <label  className="subheading">Date</label>
            <div class="form-floating">
              <input type="date" id="date" class="form-control"/>
            </div>
        </div>
        <div className='col-md-3'></div>
      </div>
      <div className='row'>
        <div className='col-md-5'></div>
        <div className='col-md-2'>
        {
       imageurl === null ?        <button
       className="btn btn-success bwt btn-lg mt-3 " disabled
       type="submit"
       onClick={postform}
     >
       Post
     </button> : <button
              className="btn btn-success bwt btn-lg mt-3"
              type="submit"
              onClick={postform}
            >
              Post
            </button>
     }
        </div>
        <div className='col-md-5'></div>
      </div>
    </div>
  )
}

export default Form