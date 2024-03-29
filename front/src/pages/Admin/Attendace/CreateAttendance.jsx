import React, { useState, useEffect } from 'react';
import { fetchWithAuth } from '../../../Auths/api';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function CreateAttendance() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [attendanceData, setAttendanceData] = useState({}); // Store attendance data for each user

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetchWithAuth('get', 'users');
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch users.');
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleCheckboxChange = (userId) => {
    setAttendanceData(prevData => ({
      ...prevData,
      [userId]: !prevData[userId] // Toggle the attendance status for the user
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Create attendance records for selected users
      const promises = Object.entries(attendanceData).map(([userId, isChecked]) => {
        if (isChecked) {
          return fetchWithAuth('post', 'attendance', {
            user_id: userId,
            status: "Present" // Assuming default status is Present when checked
          });
        }
        return Promise.resolve(); // Resolve promise if user is not checked
      });
      
      await Promise.all(promises);
    
      toast.success("Attendance Created Successfully");
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Create Attendance</h2>
      <form onSubmit={handleSubmit}>
        <div>
          {users.map(user => (
            <div key={user.id}>
              <input
                type="checkbox"
                checked={attendanceData[user.id]}
                onChange={() => handleCheckboxChange(user.id)}
              />
              <label>{user.name}</label>
            </div>
          ))}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CreateAttendance;
