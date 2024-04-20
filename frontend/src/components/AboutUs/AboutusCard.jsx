import React from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa6";

const AboutusCard = ({ name, profession, image, github }) => {
  return (
    <div className="flex text-[#2a2e90] flex-col items-center py-2 rounded-lg mt-5 w-56">
      <img
        src={image}
        alt={name}
        className="w-60 h-72 rounded-full object-cover mb-4"
      />
      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="text-[#2a2e90]">{profession}</p>
      <div className="flex justify-between items-center gap-4">
        <FaLinkedin size={25} />
        <FaGithub size={25} className="cursor-pointer" onClick={() => {}} />
      </div>
    </div>
  );
};

export default AboutusCard;
