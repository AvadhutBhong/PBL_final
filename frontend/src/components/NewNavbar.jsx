import React, { useState } from "react";
import imgsrc from "../Images/logo2.png";
import { NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { FaUser, FaSignOutAlt } from 'react-icons/fa';

const UserProfile = ({ user, onClose }) => {
  const { logout } = useAuth0();

  const handleSignOut = () => {
    logout({ returnTo: window.location.origin });
  };

  return (
    <div className="fixed inset-0 overflow-hidden z-50 flex justify-end">
      <div className="absolute right-0 bg-white shadow-md">
        <div className="p-4 flex items-center justify-center">
          <FaUser className="text-5xl text-gray-600" />
          <div className="text-center ml-4">
            <p className="font-bold">{user.name}</p>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>
        <hr className="border-t border-gray-200" />
        <ul>
          <li>
            <button onClick={handleSignOut} className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 w-full">
              <FaSignOutAlt />
              <span>Sign Out</span>
            </button>
          </li>
          {/* Add more options as needed */}
        </ul>
      </div>
      <button className="absolute top-0 right-0 mt-4 mr-4 focus:outline-none" onClick={onClose}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};

function NewNavbar() {
  const { isAuthenticated, user, loginWithRedirect } = useAuth0();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={`h-[180px] flex gap-7 w-[80%] justify-between items-center border-bottom mb-4 relative`}>
      <div className="h-[full] w-[250px] p-1 m-3">
        <img src={imgsrc} alt="logo" />
      </div>
      <div className="flex h-10 w-full justify-end">
        <ul className={`flex gap-6 font-medium transition-all ${isSidebarOpen ? '-translate-x-64' : ''}`}>
          <li className="ml-4">
            <NavLink to="/" className="no-underline text-[#190482]">
              HOME
            </NavLink>
          </li>
          {isAuthenticated && (
            <>
              <li>
                <NavLink to="/amcat" className="no-underline text-[#190482]">
                  AMCAT
                </NavLink>
              </li>
              <li>
                <NavLink to="/university" className="no-underline text-[#190482]">
                  UNIVERSITY
                </NavLink>
              </li>
            </>
          )}
          <li className="ml-2">
            <NavLink to="/about" className="no-underline text-[#190482]">
              ABOUT US
            </NavLink>
          </li>
          {!isAuthenticated && (
            <li className="flex items-center">
              <button
                onClick={() => loginWithRedirect()}
                className="text-white bg-[#6846e5] px-4 py-2 font-medium rounded-md"
              >
                Log In
              </button>
            </li>
          )}
          {isAuthenticated && !isSidebarOpen && (
            <li>
              <button onClick={toggleSidebar} className="focus:outline-none flex items-center space-x-2">
                <FaUser className="text-gray-600" size={24} />
                <span className="font-medium">{user.name}</span>
              </button>
            </li>
          )}
        </ul>
      </div>
      {isSidebarOpen && <UserProfile user={user} onClose={toggleSidebar} />}
    </div>
  );
}

export default NewNavbar;
