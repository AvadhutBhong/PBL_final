import React from "react";
import AboutusCard from "./AboutusCard";
import ajkimg from "./ajinkya.jpg";
import pranavimg from "../../Images/pranav.jpg";
import avdimg from "../../Images/avadhut.jpg";
import devimg from "../../Images/dev2.jpg";
import rohitimg from "../../Images/rohit.jpg";

const creatorsData = [
  {
    name: "Ajinkya Bobade",
    profession: "Web Developer",
    image: ajkimg, // Replace with the actual image file
  },
  {
    name: "Pranav Doke",
    profession: "Web Developer",
    image: pranavimg, // Replace with the actual image file
  },
  {
    name: "Rohit Bahir",
    profession: "Web Developer",
    image: rohitimg, // Replace with the actual image file
  },
  {
    name: "Dev Dandekar",
    profession: "Web Developer",
    image: devimg, // Replace with the actual image file
  },
  {
    name: "Avadhut Bhong",
    profession: "Web Developer",
    image: avdimg,
    github: "https://github.com/AvadhutBhong" // Replace with the actual image file
  },
];

const AboutUs = () => {
  return (
    <div className="text-center p-10">
      <h2 className="text-3xl text-[#2a2e90] font-bold mb-8">Meet Our Team</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-9  justify-between">
        {creatorsData.map((creator, index) => (
          <AboutusCard key={index} {...creator} />
        ))}
      </div>
    </div>
  );
};

export default AboutUs;
