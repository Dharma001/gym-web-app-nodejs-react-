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
      <aside
        className={`w-full md:w-[30%] xl:w-[20%] 2xl:w-[15%] h-full border-gray-300 shadow-lg  border-r relative p-4 ${
          isSidebarOpen ? 'block' : 'hidden'
        }`}
      >
        <div className="flex justify-center items-center">
          <img src="../img.png" className="w-[3em]" alt="" />
        <h2
          className="text-xl font-bold px-3 py-3 "
        >
   Fitness Factory
        </h2>
        </div>
        <div className="border-gray-500 border-b my-5"></div>
        <div className="mt-4">
        <Link to="dashboard">
            <p className="text-md my-3 font-medium  w-full text-white  hover:bg-slate-500 bg-gradient-to-br from-purple-500 to-indigo-500 px-5 py-3">
                <i class="fa-solid fa-house mr-1 text-sm"></i> Dashboard
                </p>
            </Link>
          <p className="mt-4 text-gray-500 text-[13px] font-medium">LAYOUTS & PAGES</p>
          <ul className="w-full">
              <Link to="users">
            <li className="text-[16px] my-3 font-light flex  text-black w-full  hover:bg-purple-200  px-5 py-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="1.3rem" height="1.3rem" className="mr-2" viewBox="0 0 640 512"><path fill="currentColor" d="M96 224c35.3 0 64-28.7 64-64s-28.7-64-64-64s-64 28.7-64 64s28.7 64 64 64m448 0c35.3 0 64-28.7 64-64s-28.7-64-64-64s-64 28.7-64 64s28.7 64 64 64m32 32h-64c-17.6 0-33.5 7.1-45.1 18.6c40.3 22.1 68.9 62 75.1 109.4h66c17.7 0 32-14.3 32-32v-32c0-35.3-28.7-64-64-64m-256 0c61.9 0 112-50.1 112-112S381.9 32 320 32S208 82.1 208 144s50.1 112 112 112m76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C179.6 288 128 339.6 128 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2m-223.7-13.4C161.5 263.1 145.6 256 128 256H64c-35.3 0-64 28.7-64 64v32c0 17.7 14.3 32 32 32h65.9c6.3-47.4 34.9-87.3 75.2-109.4"/></svg>
            Users
                </li>
              </Link>
              <Link to="Memberships">
            <li className="text-[16px] flex my-3 font-light  text-black w-full  hover:bg-purple-200 px-5 py-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="1.3rem" height="1.3rem" className="mr-2" viewBox="0 0 24 24">
              <path fill="currentColor" d="m14.17 13.71l1.4-2.42c.09-.15.05-.34-.08-.45l-1.48-1.16c.03-.22.05-.45.05-.68s-.02-.46-.05-.69l1.48-1.16c.13-.11.17-.3.08-.45l-1.4-2.42c-.09-.15-.27-.21-.43-.15l-1.74.7c-.36-.28-.75-.51-1.18-.69l-.26-1.85a.364.364 0 0 0-.35-.29h-2.8c-.17 0-.32.13-.35.3L6.8 4.15c-.42.18-.82.41-1.18.69l-1.74-.7c-.16-.06-.34 0-.43.15l-1.4 2.42c-.09.15-.05.34.08.45l1.48 1.16c-.03.22-.05.45-.05.68s.02.46.05.69l-1.48 1.16c-.13.11-.17.3-.08.45l1.4 2.42c.09.15.27.21.43.15l1.74-.7c.36.28.75.51 1.18.69l.26 1.85c.03.16.18.29.35.29h2.8c.17 0 .32-.13.35-.3l.26-1.85c.42-.18.82-.41 1.18-.69l1.74.7c.16.06.34 0 .43-.15M8.81 11c-1.1 0-2-.9-2-2s.9-2 2-2s2 .9 2 2s-.9 2-2 2m13.11 7.67l-.96-.74c.02-.14.04-.29.04-.44c0-.15-.01-.3-.04-.44l.95-.74c.08-.07.11-.19.05-.29l-.9-1.55c-.05-.1-.17-.13-.28-.1l-1.11.45c-.23-.18-.48-.33-.76-.44l-.17-1.18a.216.216 0 0 0-.21-.2h-1.79c-.11 0-.21.08-.22.19l-.17 1.18c-.27.12-.53.26-.76.44l-1.11-.45a.23.23 0 0 0-.28.1l-.9 1.55c-.05.1-.04.22.05.29l.95.74a3.145 3.145 0 0 0 0 .88l-.95.74c-.08.07-.11.19-.05.29l.9 1.55c.05.1.17.13.28.1l1.11-.45c.23.18.48.33.76.44l.17 1.18c.02.11.11.19.22.19h1.79c.11 0 .21-.08.22-.19l.17-1.18c.27-.12.53-.26.75-.44l1.12.45c.1.04.22 0 .28-.1l.9-1.55c.06-.09.03-.21-.05-.28m-4.29.16a1.35 1.35 0 1 1 .001-2.701a1.35 1.35 0 0 1-.001 2.701"/></svg> Memberships
                </li>
              </Link>
              <Link to="MembershipMembers">
            <li className="text-[16px] my-3 font-light  text-black w-full flex hover:bg-purple-200  px-5 py-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="1.54em" height="1.5rem" className="mr-2" viewBox="0 0 640 512"><path fill="currentColor" d="M610.5 341.3c2.6-14.1 2.6-28.5 0-42.6l25.8-14.9c3-1.7 4.3-5.2 3.3-8.5c-6.7-21.6-18.2-41.2-33.2-57.4c-2.3-2.5-6-3.1-9-1.4l-25.8 14.9c-10.9-9.3-23.4-16.5-36.9-21.3v-29.8c0-3.4-2.4-6.4-5.7-7.1c-22.3-5-45-4.8-66.2 0c-3.3.7-5.7 3.7-5.7 7.1v29.8c-13.5 4.8-26 12-36.9 21.3l-25.8-14.9c-2.9-1.7-6.7-1.1-9 1.4c-15 16.2-26.5 35.8-33.2 57.4c-1 3.3.4 6.8 3.3 8.5l25.8 14.9c-2.6 14.1-2.6 28.5 0 42.6l-25.8 14.9c-3 1.7-4.3 5.2-3.3 8.5c6.7 21.6 18.2 41.1 33.2 57.4c2.3 2.5 6 3.1 9 1.4l25.8-14.9c10.9 9.3 23.4 16.5 36.9 21.3v29.8c0 3.4 2.4 6.4 5.7 7.1c22.3 5 45 4.8 66.2 0c3.3-.7 5.7-3.7 5.7-7.1v-29.8c13.5-4.8 26-12 36.9-21.3l25.8 14.9c2.9 1.7 6.7 1.1 9-1.4c15-16.2 26.5-35.8 33.2-57.4c1-3.3-.4-6.8-3.3-8.5zM496 368.5c-26.8 0-48.5-21.8-48.5-48.5s21.8-48.5 48.5-48.5s48.5 21.8 48.5 48.5s-21.7 48.5-48.5 48.5M96 224c35.3 0 64-28.7 64-64s-28.7-64-64-64s-64 28.7-64 64s28.7 64 64 64m224 32c1.9 0 3.7-.5 5.6-.6c8.3-21.7 20.5-42.1 36.3-59.2c7.4-8 17.9-12.6 28.9-12.6c6.9 0 13.7 1.8 19.6 5.3l7.9 4.6c.8-.5 1.6-.9 2.4-1.4c7-14.6 11.2-30.8 11.2-48c0-61.9-50.1-112-112-112S208 82.1 208 144c0 61.9 50.1 112 112 112m105.2 194.5c-2.3-1.2-4.6-2.6-6.8-3.9c-8.2 4.8-15.3 9.8-27.5 9.8c-10.9 0-21.4-4.6-28.9-12.6c-18.3-19.8-32.3-43.9-40.2-69.6c-10.7-34.5 24.9-49.7 25.8-50.3c-.1-2.6-.1-5.2 0-7.8l-7.9-4.6c-3.8-2.2-7-5-9.8-8.1c-3.3.2-6.5.6-9.8.6c-24.6 0-47.6-6-68.5-16h-8.3C179.6 288 128 339.6 128 403.2V432c0 26.5 21.5 48 48 48h255.4c-3.7-6-6.2-12.8-6.2-20.3zM173.1 274.6C161.5 263.1 145.6 256 128 256H64c-35.3 0-64 28.7-64 64v32c0 17.7 14.3 32 32 32h65.9c6.3-47.4 34.9-87.3 75.2-109.4"/></svg>
            Users Memberships
                </li>
              </Link>
              <Link to="Notifications">
            <li className="text-[16px] my-3 font-light  text-black w-full flex hover:bg-purple-200  px-5 py-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="1.54em" height="1.5rem" viewBox="0 0 24 24"><path fill="currentColor" d="M7.58 4.08L6.15 2.65C3.75 4.48 2.17 7.3 2.03 10.5h2a8.445 8.445 0 0 1 3.55-6.42m12.39 6.42h2c-.15-3.2-1.73-6.02-4.12-7.85l-1.42 1.43a8.495 8.495 0 0 1 3.54 6.42M18 11c0-3.07-1.64-5.64-4.5-6.32V2.5h-3v2.18C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-6 11c.14 0 .27-.01.4-.04c.65-.14 1.18-.58 1.44-1.18c.1-.24.15-.5.15-.78h-4c.01 1.1.9 2 2.01 2"/></svg>
            Notifications
                </li>
              </Link>
              <Link to="contacts">
            <li className="text-[16px] my-3 font-light  text-black w-full flex hover:bg-purple-200  px-5 py-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="1.54em" height="1.5rem" viewBox="0 0 24 24"><path fill="currentColor" d="M7.58 4.08L6.15 2.65C3.75 4.48 2.17 7.3 2.03 10.5h2a8.445 8.445 0 0 1 3.55-6.42m12.39 6.42h2c-.15-3.2-1.73-6.02-4.12-7.85l-1.42 1.43a8.495 8.495 0 0 1 3.54 6.42M18 11c0-3.07-1.64-5.64-4.5-6.32V2.5h-3v2.18C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-6 11c.14 0 .27-.01.4-.04c.65-.14 1.18-.58 1.44-1.18c.1-.24.15-.5.15-.78h-4c.01 1.1.9 2 2.01 2"/></svg>
            Enquiry
                </li>
              </Link>
              <Link to="surveys">
            <li className="text-[16px] my-3 font-light  text-black w-full flex hover:bg-purple-200  px-5 py-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="1.54em" height="1.5rem" viewBox="0 0 24 24"><path fill="currentColor" d="M7.58 4.08L6.15 2.65C3.75 4.48 2.17 7.3 2.03 10.5h2a8.445 8.445 0 0 1 3.55-6.42m12.39 6.42h2c-.15-3.2-1.73-6.02-4.12-7.85l-1.42 1.43a8.495 8.495 0 0 1 3.54 6.42M18 11c0-3.07-1.64-5.64-4.5-6.32V2.5h-3v2.18C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-6 11c.14 0 .27-.01.4-.04c.65-.14 1.18-.58 1.44-1.18c.1-.24.15-.5.15-.78h-4c.01 1.1.9 2 2.01 2"/></svg>
            Surveys
                </li>
              </Link>
              <Link to="appointments">
            <li className="text-[16px] my-3 font-light  text-black w-full flex hover:bg-purple-200  px-5 py-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="1.54em" height="1.5rem" viewBox="0 0 24 24"><path fill="currentColor" d="M7.58 4.08L6.15 2.65C3.75 4.48 2.17 7.3 2.03 10.5h2a8.445 8.445 0 0 1 3.55-6.42m12.39 6.42h2c-.15-3.2-1.73-6.02-4.12-7.85l-1.42 1.43a8.495 8.495 0 0 1 3.54 6.42M18 11c0-3.07-1.64-5.64-4.5-6.32V2.5h-3v2.18C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-6 11c.14 0 .27-.01.4-.04c.65-.14 1.18-.58 1.44-1.18c.1-.24.15-.5.15-.78h-4c.01 1.1.9 2 2.01 2"/></svg>
            Appointments
                </li>
              </Link>
              <Link to="attendance">
            <li className="text-[16px] my-3 font-light  text-black w-full flex hover:bg-purple-200  px-5 py-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="1.54em" height="1.5rem" viewBox="0 0 24 24"><path fill="currentColor" d="M7.58 4.08L6.15 2.65C3.75 4.48 2.17 7.3 2.03 10.5h2a8.445 8.445 0 0 1 3.55-6.42m12.39 6.42h2c-.15-3.2-1.73-6.02-4.12-7.85l-1.42 1.43a8.495 8.495 0 0 1 3.54 6.42M18 11c0-3.07-1.64-5.64-4.5-6.32V2.5h-3v2.18C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-6 11c.14 0 .27-.01.4-.04c.65-.14 1.18-.58 1.44-1.18c.1-.24.15-.5.15-.78h-4c.01 1.1.9 2 2.01 2"/></svg>
            Attendance
                </li>
              </Link>
          </ul>
        </div>
        <button onClick={toggleSidebar} className=" left-0 text-white absolute bottom-0 text-[1.3rem] bg-gradient-to-br from-purple-500 to-indigo-500  w-full py-3">

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
        <main class="mx-8">
        <Outlet/>
        </main>
          </div>
          
    </div>
  );
}

export default GymDashboard;
