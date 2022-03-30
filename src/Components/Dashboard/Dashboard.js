import React from "react";
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
import {Link } from "react-router-dom"

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  height: 600,
  bgcolor: "#f9f9fb",
  border: "2px solid #000",
  borderRadius: "35px",
  boxShadow: 24,
  p: 4,
  textAlign: "center",
};

const Dashboard = () => {
  const navigate = useNavigate()
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const [imageurl, setimageurl] = useState(null);
  const [cards, setcards] = useState([])

  useEffect(() => {
    getalldata()
  }, [])
  








const getalldata = async() => {
  var id = sessionStorage.getItem("userid")
  console.log(id)
  var Id = {
    userid: id
  }
  console.log(Id)
  var data = await axios.post("https://dairy-coder.herokuapp.com/cards",Id ).then((res) => { return res.data})
  console.log(data)
  setcards(data)
}

const deletepost = async() => {
  var id = document.getElementById("objId").value
  var rubber = {
    _id:id
  }
 
  var rubdata = await axios.post("https://dairy-coder.herokuapp.com/like",rubber).then((res) => { return res.data})
 getalldata()
}

const logout = () => {
  sessionStorage.clear();
  navigate("/")
}
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
        <div class="d-flex flex-column flex-shrink-0 p-3 bg-light" style={{height: "100vh"}} >
 <h1>Memories</h1>
    <hr />
    <ul class="nav nav-pills flex-column mb-auto">
      <li class="nav-item">
        <a href="#" class="nav-link active" aria-current="page">
          <svg class="bi me-2" width="16" height="16"><use ></use></svg>
          Dashboard
        </a>
      </li>
      <li>
        <a href="#" class="nav-link link-dark">
          <svg class="bi me-2" width="16" height="16"><use></use></svg>
          
        </a>
      </li>
      <li>
        <a href="#" class="nav-link link-dark">
          <svg class="bi me-2" width="16" height="16"><use></use></svg>

        </a>
      </li>
      <li>
        <a href="#" class="nav-link link-dark">
          <svg class="bi me-2" width="16" height="16"><use ></use></svg>
          
        </a>
      </li>
      <li>
        <a href="#" class="nav-link link-dark">
          <svg class="bi me-2" width="16" height="16"><use ></use></svg>
          
        </a>
      </li>
    </ul>
    <hr />
    <div class="dropdown">
      <a href="#" class="d-flex align-items-center link-dark text-decoration-none dropdown-toggle" id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
        <img src="https://github.com/mdo.png" alt="" width="32" height="32" class="rounded-circle me-2"/>
        <strong onClick={logout}>Sign out</strong>
      </a>
      <ul class="dropdown-menu text-small shadow" aria-labelledby="dropdownUser2">
        <li><a class="dropdown-item" href="#">New project...</a></li>
        <li><a class="dropdown-item" href="#">Settings</a></li>
        <li><a class="dropdown-item" href="#">Profile</a></li>
        <li><hr class="dropdown-divider" /></li>
        <li><a class="dropdown-item" href="#">Sign out</a></li>
      </ul>
    </div>
  </div>
        </div>
          <div className="col-md-10">
            <div className="row">
              <div className="col-md-4">
                <Link to="/form">
          <button className="btn btn-success btn-lg mt-4 mb-3" onClick={handleOpen}>+ Add Memories</button>
          </Link>
          <div>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                  <div className="container">
    <div className="row">
        <div className="col-lg-12 heading">
          <p>Create your Memories</p>
        </div>
      </div>
      <div className="row inputboxes">
          <div className="col-lg-3"></div>
          <div className=" col-lg-6 inputlevels">
       
          
        
        

          </div>
        
        </div>
    </div>

                    
                  </Box>
                </Modal>
              </div>
          </div>
            </div>
            <div className="row" >
            { cards !== null ? (
 cards.map((items,index) => (
        
  <div className="col-md-3"key={index}>
  <div class="card">
<img src={items.image} class="card-img-top card__design" alt="..." />
<div class="card-body">
  <h5 class="card-title">{items.title}</h5>
  <p class="card__text">
   {items.desc}
  </p>
  <a  class="btn btn-primary">
    {moment(items.date).format('MMM Do YY')}
  </a>
  <button className="btn btn-danger" onClick={deletepost} value={items._id} id="objId">Delete</button>
</div>
</div>
  </div>

))
            ) : (null)
             
            }
          
        
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
