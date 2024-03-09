import React, { useState } from "react";
import { Link, useNavigate, useNavigation,Outlet } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import Cookies from 'js-cookie';
function GymDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = async () => {
    Cookies.remove('accessToken');
    Cookies.remove('roleId');
    Cookies.remove('userId');
    navigate("/");
    toast.success('Logout successfull');
  };
    const [isOpen, setIsOpen] = useState(false);
  
    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };
  
    const closeDropdown = () => {
      setIsOpen(false);
    };
  
  return (
    <div className="flex h-[100vh] bg-white">
      {/* Sidebar */}
      <aside
        className={`w-full md:w-1/2 xl:w-1/6 h-full bg-purple-900 relative p-4 rounded-tr-[10%]  text-white ${
          isSidebarOpen ? 'block' : 'hidden'
        }`}
      >
        <h2
          className="text-2xl font-bold  my-2
      text-white  px-3 py-3 "
        >
        <i class="fa-solid fa-dumbbell mr-2"></i> Fitness Factory
        </h2>
        <div className="border-gray-200 border-b mt-7"></div>
        <div className="mt-4">
        <Link to="dashboard">
            <p className="text-md my-3 font-medium  hover:text-gray-300 w-full text-white bg-purple-500 px-5 py-3">
                <i class="fa-solid fa-house mr-1 text-sm"></i> Dashboard
                </p>
            </Link>
          <p className="mt-4 text-gray-500 text-[14px] font-semibold">LAYOUTS & PAGES</p>
          <ul className="w-full">
              <Link to="users">
            <li className="text-[16px] my-3 font-light  text-gray-300 w-full  hover:text-white hover:bg-purple-500 px-5 py-3">
            <i class="fa-regular fa-user mr-1 text-sm"></i> Users
                </li>
              </Link>
          </ul>
        </div>
        <button onClick={toggleSidebar} className=" left-0 text-white absolute bottom-0 text-[1.3rem] bg-blue-500 w-full py-3">

{isSidebarOpen ? <i class="fa-solid fa-arrow-left"></i> : <i class="fa-solid fa-bars"></i>}
</button>
      </aside>
      <div className="flex-1">
        <header className="bg-white p-4 text-white">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <button onClick={toggleSidebar} className="mr-4 text-[1.8rem] text-black">
                {isSidebarOpen ? <i class="fa-solid fa-arrow-left"></i> : <FaBars />}
              </button>
              <h1 className="text-xl font-semibold">Admin Dashboard</h1>
            </div>
            <div className="relative">
      <button onClick={toggleDropdown} className="focus:outline-none">
        <img
          src="../img.png"
          alt="Profile"
          className="w-16 rounded-full"
        />
      </button>
      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg"
          onClick={closeDropdown}
        >
          <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Dashboard</a>
          <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Edit Profile</a>
          <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200"onClick={handleLogout}>Log Out</a>
        </div>
      )}
    </div>
          </div>
        </header>
        <main>
        <Outlet/>
        </main>
          </div>
          
    </div>
  );
}

export default GymDashboard;
