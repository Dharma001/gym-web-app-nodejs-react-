import React, { useState, useEffect } from "react";
import { fetchWithAuth } from "../../../Auths/api";
import { Link } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const URL = "http://localhost:5000/";
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetchWithAuth("get", "users");
        setUsers(response.data);
        setFilteredUsers(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const filteredResults = users.filter(
      (user) =>
        (user.name &&
          user.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (user.email &&
          user.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (user.phone &&
          user.phone.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (user.memberId &&
            user.memberId.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    setFilteredUsers(filteredResults);
  }, [searchQuery, users]);

  const handleDeleteUser = async (userId) => {
    try {
      await fetchWithAuth("delete", `deleteUser/${userId}`);
      setUsers(users.filter((user) => user.id !== userId));
      setFilteredUsers(filteredUsers.filter((user) => user.id !== userId));
      toggleModal();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="px-4 py-4">
      <h2 className="text-2xl flex items-center  font-bold mb-[2rem]">
        {" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="2rem"
          height="2rem"
          className="mr-3"
          viewBox="0 0 640 512"
        >
          <path
            fill="currentColor"
            d="M96 224c35.3 0 64-28.7 64-64s-28.7-64-64-64s-64 28.7-64 64s28.7 64 64 64m448 0c35.3 0 64-28.7 64-64s-28.7-64-64-64s-64 28.7-64 64s28.7 64 64 64m32 32h-64c-17.6 0-33.5 7.1-45.1 18.6c40.3 22.1 68.9 62 75.1 109.4h66c17.7 0 32-14.3 32-32v-32c0-35.3-28.7-64-64-64m-256 0c61.9 0 112-50.1 112-112S381.9 32 320 32S208 82.1 208 144s50.1 112 112 112m76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C179.6 288 128 339.6 128 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2m-223.7-13.4C161.5 263.1 145.6 256 128 256H64c-35.3 0-64 28.7-64 64v32c0 17.7 14.3 32 32 32h65.9c6.3-47.4 34.9-87.3 75.2-109.4"
          />
        </svg>{" "}
        All Members
      </h2>
      <div className="float-right">
        <Link
          to="/admin/createUser"
          className="bg-gradient-to-br from-purple-500 to-indigo-500 hover:bg-slate-600 text-white px-7 py-2 rounded-sm text-lg transition duration-300 ease-in-out flex items-center"
        >
          <i className="fa-solid fa-plus mr-2"></i> Create
        </Link>
      </div>
      <div className="my-4 w-[40%] border flex justify-center items-center border-gray-300">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1.7rem"
          height="1.7rem"
          className=" ml-4 mr-2"
          viewBox="0 0 50 50"
        >
          <path
            fill="currentColor"
            d="M23 36c-7.2 0-13-5.8-13-13s5.8-13 13-13s13 5.8 13 13s-5.8 13-13 13m0-24c-6.1 0-11 4.9-11 11s4.9 11 11 11s11-4.9 11-11s-4.9-11-11-11"
          />
          <path
            fill="currentColor"
            d="m32.682 31.267l8.98 8.98l-1.414 1.414l-8.98-8.98z"
          />
        </svg>
        <input
          type="text"
          placeholder="Search by name, email, or phone or memberId"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border-none rounded-sm px-3 py-3 w-full focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="">
  <hr className="my-4" />
  {error ? (
    <p className="text-red-500">Error: {error}</p>
  ) : filteredUsers.length > 0 ? (
    <div className="overflow-x-auto">
      <table className="w-full border border-gray-200 divide-y divide-gray-200">
        <thead className="bg-slate-800">
          <tr>
            <th className="px-6 text-white py-3 text-[.9rem] font-semibold uppercase tracking-wider">
              SN
            </th>
            <th className="px-6 text-white py-3 text-[.9rem] font-semibold uppercase tracking-wider">
              Member Id
            </th>
            <th className="px-6 text-white py-3 text-[.9rem] font-semibold uppercase tracking-wider">
              Member Image
            </th>
            <th className="px-6 text-white py-3 text-[.9rem] font-semibold uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 text-white py-3 text-[.9rem] font-semibold uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 text-white py-3 text-[.9rem] font-semibold uppercase tracking-wider">
              Phone
            </th>
            <th className="px-6 text-white py-3 text-[.9rem] font-semibold uppercase tracking-wider">
              Role
            </th>
            <th className="px-6 text-white py-3 text-[.9rem] font-semibold uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {filteredUsers.map((user, index) => (
            <tr
              key={user.id}
              className={index % 2 === 0 ? "bg-purple-50" : "bg-white"}
            >
              <td className="px-6 py-4 whitespace-nowrap text-md text-center">
                {index + 1}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-md text-center">
                {user.memberId}
              </td>
              <td>
                <img
                  src={`${URL}${user.image}`}
                  alt="Service Image"
                  className="w-[80px] h-[80px] mt-4 object-cover object-fit transition-opacity duration-300 rounded-full mb-4"
                  title={user.name}
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-md text-center">
                {user.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-md text-center">
                {user.email}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-md text-center">
                {user.phone}
              </td>
              <td className=" whitespace-nowrap text-md text-center">
             <p className="px-5 font-semibold text-white py-2 bg-green-500 ">   {user.role_name}</p>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-md text-center">
  <button
    onClick={toggleModal}
    className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-sm transition duration-300 ease-in-out flex items-center"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1.2em"
      height="1.2em"
      viewBox="0 0 2048 2048"
    >
      <path
        fill="currentColor"
        d="M1792 384h-128v1472q0 40-15 75t-41 61t-61 41t-75 15H448q-40 0-75-15t-61-41t-41-61t-15-75V384H128V256h512V128q0-27 10-50t27-40t41-28t50-10h384q27 0 50 10t40 27t28 41t10 50v128h512zM768 256h384V128H768zm768 128H384v1472q0 26 19 45t45 19h1024q26 0 45-19t19-45zM768 1664H640V640h128zm256 0H896V640h128zm256 0h-128V640h128z"
      />
    </svg>
  </button>
  <Link to={`/admin/userMembership/${user.id}`} className="text-white">
    <button className="bg-black hover:bg-red-500 mt-2 text-white px-3 py-2 rounded-sm transition duration-300 ease-in-out flex items-center">
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
        <path fill="currentColor" d="M4 2h16q.825 0 1.413.588T22 4v11q0 .825-.587 1.413T20 17h-4v3.375q0 .575-.475.863t-.975.037l-2.1-1.05q-.2-.125-.45-.125t-.45.125l-2.1 1.05q-.5.25-.975-.037T8 20.375V17H4q-.825 0-1.412-.587T2 15V4q0-.825.588-1.412T4 2m0 11h16v-3H4z"/>
      </svg>
    </button>
  </Link>
</td>
<td>
  {isOpen && (
    <div className="fixed z-10 inset-0 overflow-y-auto ">
      <div className="flex items-center justify-center min-h-screen bg-slate-900 opacity-50">
        <div className="relative bg-white  p-12 rounded-md max-w-lg mx-auto">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Delete Confirmation</h2>
            <button
              onClick={toggleModal}
              className="text-gray-500 hover:text-gray-700 focus:outline-none relative top-[-15px]"
            >
<svg xmlns="http://www.w3.org/2000/svg" width="1.2rem" height="1.2rem" viewBox="0 0 15 15"><path fill="currentColor" fill-rule="evenodd" d="M11.782 4.032a.575.575 0 1 0-.813-.814L7.5 6.687L4.032 3.218a.575.575 0 0 0-.814.814L6.687 7.5l-3.469 3.468a.575.575 0 0 0 .814.814L7.5 8.313l3.469 3.469a.575.575 0 0 0 .813-.814L8.313 7.5z" clip-rule="evenodd"/></svg>
            </button>
          </div>
          <div className="mt-4">
            <p>Are you sure you want to delete this item?</p>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={() => handleDeleteUser(user.id)}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mr-4 focus:outline-none"
            >
              Delete
            </button>
            <button
              onClick={toggleModal}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )}
</td>

              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <p className="text-center">No Members found with the provided search criteria.</p>
  )}
</div>

    </div>
  );
};

export default Users;
