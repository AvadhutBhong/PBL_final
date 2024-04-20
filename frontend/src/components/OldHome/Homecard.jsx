import React from "react";
import { Link } from "react-router-dom";
import { MdArrowOutward } from "react-icons/md";
import amcatimg from "../../Images/AMCAT.png";
import uniimg from "../../Images/uni.jpg";
function Homecard() {
  return (
    <div className=" homecard mt-10 pl-10 row row-cols-2 row-cols-md-3 g-2 flex justify-center pt-10">
      <div className="col home-card-body ">
        <div className="card h-100 w-75">
          <img src={amcatimg} className="card-img-top " alt="Amcat Image" />
          <div className="card-body">
            <h5 className="card-title">AMCAT Result</h5>
            <p className="card-text">
              This is a longer card with supporting text below as a natural
              lead-in to additional content.
            </p>
            <Link className="icon-link icon-link-hover" to="/amcat">
              Go to Amcat Result
              <MdArrowOutward />
              <svg className="bi" aria-hidden="true">
                <use xlinkHref="#arrow-right"></use>
              </svg>
            </Link>
          </div>
        </div>
      </div>
      <div className="col home-card-body">
        <div className="card h-100 w-75">
          <img src={uniimg} className="card-img-top" alt="Exam image" />
          <div className="card-body">
            <h5 className="card-title">University Result</h5>
            <p className="card-text">
              This is a longer card with supporting text below as a natural
              lead-in to additional content. This content is a little bit
              longer.
            </p>
            <Link className="icon-link icon-link-hover" to="/university">
              Go to University result
              <MdArrowOutward />
              <svg className="bi" aria-hidden="true">
                <use xlinkHref="#arrow-right"></use>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homecard;
