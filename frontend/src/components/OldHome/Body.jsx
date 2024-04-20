import React from "react";
import styles from "./Body.module.css";
// import webinarGif from "../../Images/webinar.gif";
import webinarVdo from "../../Images/Vmake-1710349352775.mp4";
import { useEffect } from 'react';

function Body() {
  return (
    <>
      <div className="flex flex-col-reverse w-[80%] justify-center items-center md:flex-row  ">
        <div className={`col-lg-7 p-3 p-lg-5 pt-lg-3 text-left `}>
          <h1
            className={`display-4 fw-bold lh-1 text-left  mb-4 
              ${styles.bodyHead}`}
          >
            Student Performance Analysis for Mentoring
          </h1>

          <p className="lead text-blue-900">
            Welcome to Student Result Analyser, where student success takes
            center stage! Our platform offers data-driven insights for mentoring
            & enhance academic performance of students. Join us in
            revolutionizing education !!
          </p>
        </div>

        <video
          className="w-full max-w-lg"
          width="640"
          height="360"
          autoPlay
          muted
        >
          <source src={webinarVdo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* <img src={webinarGif} alt="Webinar gif" /> */}

      {/* <div className="home-body row pe-lg-0 w-[80%] pt-lg-5 align-items-center rounded-3 shadow-lg ">
        <div className={`col-lg-7 p-3 p-lg-5 pt-lg-3 text-left `}>
          <h1
            className={`display-4 fw-bold lh-1 text-left  mb-4 
              ${styles.bodyHead}`}
          >
            Student Performance Analysis for Mentoring
          </h1>

          <p className="lead text-blue-900">
            Welcome to Student Result Analyser, where student success takes
            center stage! Our platform offers data-driven insights for mentoring
            & enhance academic performance of students. Join us in
            revolutionizing education !!
          </p>
        </div>
        <div className="col-lg-4 mb-4 offset-lg-1 p-0 overflow-hidden shadow-lg">
          <img
            className="rounded-lg-3"
            src="https://taxila.in/blog/wp-content/uploads/2021/03/mentoring.jpg"
            alt=""
            width="720"
          />
        </div>
      </div> */}
    </>
  );
}

export default Body;
