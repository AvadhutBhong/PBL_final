import React from "react";
import imgsrc from "../Images/logo2.png";
import { NavLink, Link } from "react-router-dom";
function NewNavbar() {
  return (
    <div className=" h-[180px] flex gap-7 w-[80%] justify-around items-center border-bottom mb-4">
      <div className="h-[full] w-[250px] p-1 m-3">
        <img src={imgsrc} alt="logo" />
      </div>
      <div className="flex h-10 ">
        <div className="flex items-center justify-center p-3 mr-3">
          <ul className="flex justify-between items-center gap-10 mt-3 mr-10">
            <li className=" text-decoration-none">
              <NavLink to="/" className={"no-underline text-[#190482]"}>
                HOME
              </NavLink>
            </li>
            <li className="">
              <NavLink to="/amcat" className={"no-underline text-[#190482]"}>
                AMCAT
              </NavLink>
            </li>
            <li className="">
              <NavLink
                to="/university"
                className={"no-underline text-[#190482]"}
              >
                UNIVERSITY
              </NavLink>
            </li>
            <li className="">
              <NavLink to="/about" className={"no-underline text-[#190482]"}>
                ABOUT US
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="flex items-center rounded-3 bg-[#6846e5] ">
          <button type="button " className="btn">
            <Link to="/login" className={"no-underline text-white"}>
              Sign Up
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewNavbar;
