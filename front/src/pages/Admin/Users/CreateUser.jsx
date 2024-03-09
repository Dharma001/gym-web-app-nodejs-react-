import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchWithAuth } from '../../../Auths/api';

const CreateUser = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confPassword: "",
    role_id: "",
    phone: "",
    memberId: "",
    date_of_birth: "",
    join_date: "",
    image: null, // Add image state to handle file upload
  });
  const [roles, setRoles] = useState([]);
  const [showpassword, setshowpassword] = useState(false);
  const [showConfPassword, setShowConfPassword] = useState(false);
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await fetchWithAuth("get", "roleLists");
        setRoles(response.data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchRoles();
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({
        ...formData,
        image: e.target.files[0],
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confPassword) {
      setErrors({ ...errors, confPassword: "Passwords do not match" });
      return;
    }
    try {
      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }
      const response = await fetchWithAuth("post", "createUser", formDataToSend);
      if (response.status === 201) {
        navigate("/admin/users");
        toast.success("User Created Successfully");
      } else {
        const errorData = await response.json();
        toast.error(errorData.message);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };
  return (
    <div className="container mx-auto px-5 xl:w-4/5 my-6">
      <h2 className="text-2xl font-bold mb-4">Create User</h2>
      {error && <p className="text-red-500">Error: {error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-col-1 sm:grid-cols-2 ">
          <div>
            <label htmlFor="name" className="block">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter user name"
              value={formData.name}
              onChange={handleChange}
              required
              className="border rounded-md px-6 py-2"
            />
          </div>
          <div>
            <label htmlFor="email" className="block">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter user email"
              value={formData.email}
              onChange={handleChange}
              required
              className="border rounded-md px-6 py-2"
            />
          </div>
        </div>

        <div className="grid grid-col-1 sm:grid-cols-2 ">
          <div>
            <label htmlFor="phone" className="block">Phone:</label>
            <input
              type="text"
              id="phone"
              name="phone"
              placeholder="Enter phone number"
              value={formData.phone}
              onChange={handleChange}
              className="border rounded-md px-6 py-2"
            />
          </div>
          <div>
            <label htmlFor="memberId" className="block">Member ID:</label>
            <input
              type="text"
              id="memberId"
              name="memberId"
              placeholder="Enter member ID"
              value={formData.memberId}
              onChange={handleChange}
              className="border rounded-md px-6 py-2"
            />
          </div>
        </div>

        <div className="grid grid-col-1 sm:grid-cols-2 ">
          <div>
            <label htmlFor="date_of_birth" className="block">Date of Birth:</label>
            <input
              type="date"
              id="date_of_birth"
              name="date_of_birth"
              value={formData.date_of_birth}
              onChange={handleChange}
              className="border rounded-md px-6 py-2"
            />
          </div>
          <div>
            <label htmlFor="join_date" className="block">Join Date:</label>
            <input
              type="date"
              id="join_date"
              name="join_date"
              value={formData.join_date}
              onChange={handleChange}
              className="border rounded-md px-6 py-2"
            />
          </div>
        </div>

        <div>
          <label htmlFor="roleId" className="block">Role ID:</label>
          <select
            id="role_id"
            name="role_id"
            value={formData.role_id}
            onChange={handleChange}
            required
            className="border rounded-md px-2 py-1"
          >
            <option value="">Select Role</option>
            {roles.map((role) => (
              <option key={role.id} value={role.id}>{role.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block mb-2">Image:</label>
          <input
            type="file"
            name="image"
            onChange={handleChange}
            className="border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <div>
          <label htmlFor="password" className="block">Password:</label>
          <input
            type={showpassword ? "text" : "password"}
            id="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
            className="border rounded-md px-6 py-2"
          />
        </div>

        <div>
          <label htmlFor="confPassword" className="block">Confirm Password:</label>
          <input
            type={showConfPassword ? "text" : "password"}
            id="confPassword"
            name="confPassword"
            placeholder="Confirm your password"
            value={formData.confPassword}
            onChange={handleChange}
            required
            className="border rounded-md px-6 py-2"
          />
        </div>

        {errors.confPassword && <p className="text-red-500">{errors.confPassword}</p>}

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Create User</button>
      </form>
    </div>
  );
};

export default CreateUser;
