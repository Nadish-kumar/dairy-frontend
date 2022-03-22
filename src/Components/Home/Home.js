import React from "react";
import "../../assests/Css/Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home">
      <div className="home__content">
        <p>Create your own Memories</p>
        <Link to="/login">
          <button className="btn btn-success btn-lg ">Login</button>
        </Link>
        <Link to="/signup">
          <button className="btn btn-success btn-lg ">Sign-up</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
