import React from "react";
import { Link, useNavigate, useNavigation,Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from 'js-cookie';
function Nav() {
  const navigate = useNavigate();
  const isLoggedIn = () => {
    return Cookies.get('accessToken') && Cookies.get('roleId');
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    Cookies.remove('accessToken');
    Cookies.remove('roleId');
    Cookies.remove('userId');
    navigate("/");
    toast.success('Logout successfull');
  };
  function isMember() {
    const roleId = Cookies.get("roleId");
    return roleId === "2"; 
  }
  return (

    <> 
    <div className="nav-head bg-red-50">
    <div className="main w-full xl:w-4/5 xl:mx-auto ">
        <div className=" flex justify-between items-center bg-red-50  text-gray-800">
          <div className="mt-3">
            <p className=" text-sm font-light ">
              <i class="fa-regular fa-envelope text-red-500"></i>{" "}
              fitness@factory.com
            </p>
          </div>
          <div class="flex justify-center items-center text-[12px] hover:text-red-500">
                    <i class="fa-solid fa-phone text-red-500 p-2 shadow-lg rounded-full text-2xl"></i>
                    <p class="text-[12px] font-semibold mt-3">90874848484</p>
                  </div>
              </div>
      </div>
     </div>
     <div>  
      <div className="main border-b-2 w-full xl:w-4/5 xl:mx-auto bg-white">
        <nav class="   w-full sticky transition-opacity duration-500">
          <div class="px-2 py-2">
            <div class="flex items-center justify-between">
              <a href="#" class="w-[10rem] relative">
                <img src="./img.png" class="w-[5rem] h-[5rem]" alt="" />
              </a>
              <div class="hidden md:flex items-center space-x-4">
                <ul class="flex flex-row">
                  <li class=" border-b border-gray-100 pr-[15px] py-[17px]">
                    <Link
                      to="/"
                      class="nav md:text-[14px] lg:text-[17px] font-semibold text-black"
                    >
                      Home
                    </Link>
                  </li>
                  <li class="border-b border-gray-100 pr-[15px] py-[17px]">
                    <Link
                      to="/"
                      class="nav md:text-[14px] lg:text-[17px] font-semibold text-black"
                    >
                      Memberships
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="grid">
      {isLoggedIn() ? (
        <button onClick={handleLogout} className="text-white mr-6 md:mr-auto text-[14px] md:text-[20px] font-semibold px-12 py-3 rounded-md  hover:bg-red-600 border hover:border-red-500 border-slate-900 bg-red-500">
          Logout
        </button>
        
      ) : (
        <>
          <a href="/login">
            <button className="text-white mr-6 md:mr-auto text-[14px] md:text-[18px] font-semibold px-12 py-3 rounded-md  hover:bg-red-600 border hover:border-red-500 border-slate-900 bg-red-500">
              Login
            </button>
          </a>
        </>
      )}
{isMember() ? (
  <Link to={"/Member"}
    className="text-white w-20 md:w-auto mr-6 md:mr-auto text-xs md:text-sm font-semibold px-4 py-2 rounded-md hover:bg-red-600 border hover:border-red-600 border-red-600 bg-red-500"
  >
    Dashboard
  </Link>
) :null}
    </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
    
     </>

  );
}

export default Nav;
