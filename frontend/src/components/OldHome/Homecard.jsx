import React from "react";
import { Link } from "react-router-dom";
import { MdArrowOutward } from "react-icons/md";
import amcatimg from "../../Images/AMCAT.png";
import uniimg from "../../Images/uni.png";
function Homecard() {
  return (
    <div className="flex justify-center mt-10 w-[80%]">
  <div className="w-[80%] md:w-4/5 lg:w-3/4">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="flex flex-col bg-white rounded-lg overflow-hidden border border-gray-200">
        <img src={amcatimg} className="w-full h-80 md:w-auto object-cover object-center" alt="Amcat Image" />
        <div className="p-6">
          <h2 className="text-xl font-semibold text-blue-700 mb-1">AMCAT Result</h2>
          <p className="text-gray-600">Amcat section for Engineering students Amcat result analysis.</p>
          <Link to="/amcat" className="inline-block mt-1 px-4 py-1 text-white bg-[#6846e5]  rounded-md hover:bg-purple-300 transition-colors duration-300 no-underline">
            Go to AMCAT Result
            <MdArrowOutward className="inline-block ml-2" />
          </Link>
        </div>
      </div>
      <div className="flex flex-col bg-white rounded-lg overflow-hidden border border-gray-200">
        <img src={uniimg} className="w-full h-80  md:w-auto object-cover object-center" alt="University Image" />
        <div className="p-6">
          <h2 className="text-xl font-semibold text-blue-700">University Result</h2>
          <p className="text-gray-600">University section for Insem / university exam result analysis</p>
          <Link to="/university" className="inline-block px-4 py-1 text-white bg-[#6846e5]  rounded-md hover:bg-purple-300 transition-colors duration-300 no-underline">
            Go to University Result
            <MdArrowOutward className="inline-block ml-2" />
          </Link>
        </div>
      </div>
    </div>
  </div>
</div>

  );
}

export default Homecard;
