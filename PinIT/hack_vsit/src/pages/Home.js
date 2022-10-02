import React from "react";
import { LoadScript } from "@react-google-maps/api";
import { useUserContext } from "../context/UserContext";
import { useState } from "react";

import Map2 from "./Map2";
import ProblemForm from "./ProblemForm";

import "./Home.css";
import "./AddPlace.css";

const Home = () => {
  const { showForm, setShowForm, getCurrentLocation} = useUserContext();
  
  return (
    <div className="home-container">

        {(showForm) ? <></> : (

            <div className="form-container">
                <ProblemForm />
            </div>
        )}
        

        <div className="map-container">
            <LoadScript
            id="script-loader"
            googleMapsApiKey={"AIzaSyBX1z5nvjcjzyxSMT-QCVS3ERu6Y3iNSb0"}
            language="en"
            region="EN"
            version="weekly"
            >
            <Map2 />

            </LoadScript>

        </div>

        {(!showForm) ? <></> : (
            <button className="add-place-btn" onClick={()=>{setShowForm(!showForm)}}> 
                <i className="fa-solid fa-location-dot"></i> Add Place
            </button>
        )}

    </div>
  );
};

export default Home;
