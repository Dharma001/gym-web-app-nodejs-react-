import React, { useState, useEffect } from 'react';
import { fetchWithAuth } from '../../../Auths/api';
import { toast } from "react-toastify";

function CreateAttendance() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [date, setDate] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [attendanceData, setAttendanceData] = useState([]);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleChange = (e) => {
    setDate(e.target.value);
  };

  const fetchAttendanceData = async () => {
    try {
      setLoading(true);
      const response = await fetchWithAuth("get", `attendances?date=${date}`);
      setAttendanceData(response.data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendanceData();
  }, [date]);

  const createAttendanceForDate = async () => {
    if (!date) {
      setError('Please select a date');
      return;
    }

    setLoading(true);
    try {
      // Send a request to create attendance records for the selected date
      const response = await fetchWithAuth('post', 'attendance', { date });
      if (response.status === 201) {
        toggleModal();
        toast.success("Attendance records created successfully for the selected date");
        fetchAttendanceData(); // Fetch updated attendance data
      } else {
        setError('Failed to create attendance records');
        toast.error("Failed to create attendance records");
      }
    } catch (error) {
      setError('Failed to create attendance records');
      console.error('Error creating attendance records:', error);
      toast.error("Failed to create attendance records");
    } finally {
      setLoading(false);
    }
  };

  const updateAttendanceStatus = async (id, newStatus) => {
    setLoading(true);
    try {
      // Send a request to update the status of the attendance record
      const response = await fetchWithAuth("patch", `attendance/${id}`, { status: newStatus });
      if (response.status === 200) {
        toast.success("Attendance record updated successfully");
        fetchAttendanceData(); // Fetch updated attendance data
      } else {
        setError('Failed to update attendance record');
        toast.error("Failed to update attendance record");
      }
    } catch (error) {
      setError('Failed to update attendance record');
      console.error('Error updating attendance record:', error);
      toast.error("Failed to update attendance record");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Attendance</h2>
      <div className="flex mb-4">
        <button
          onClick={toggleModal}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-sm mr-4 focus:outline-none"
        >
          Create Attendance
        </button>
        <input
          type="date"
          value={date}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-1 focus:outline-none"
        />
      </div>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">User ID</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Phone</th>
            <th className="px-4 py-2">Member ID</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Present</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {attendanceData.map((attendance) => (
            <tr key={attendance.id}>
              <td className="border px-4 py-2">{attendance.user.id}</td>
              <td className="border px-4 py-2">{attendance.user.name}</td>
              <td className="border px-4 py-2">{attendance.user.phone}</td>
              <td className="border px-4 py-2">{attendance.user.memberId}</td>
              <td className="border px-4 py-2">{attendance.user.email}</td>
              <td className="border px-4 py-2">{attendance.date}</td>
              <td className="border px-4 py-2">{attendance.status}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => updateAttendanceStatus(attendance.id, 'Present')}
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded-sm mr-2 focus:outline-none"
                >
                  Present
                </button>
                <button
                  onClick={() => updateAttendanceStatus(attendance.id, 'Absent')}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded-sm mr-2 focus:outline-none"
                >
                  Absent
                </button>
                <button
                  onClick={() => updateAttendanceStatus(attendance.id, 'Late')}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-2 rounded-sm mr-2 focus:outline-none"
                >
                  Late
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {error && <div className="text-red-600">{error}</div>}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Create Attendance</h2>
            <label htmlFor="date">Select Date:</label>
            <input
              type="date"
              id="date"
              name="date"
              value={date}
              onChange={handleChange}
              className="border border-gray-300 rounded px-3 py-1 mb-4 focus:outline-none block"
            />
            {error && <div className="text-red-600">{error}</div>}
            <div className="flex justify-end">
              <button
                onClick={createAttendanceForDate}
                disabled={loading}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-sm mr-2 focus:outline-none"
              >
                {loading ? "Creating Attendance..." : "Create Attendance"}
              </button>
              <button
                onClick={toggleModal}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-sm focus:outline-none"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreateAttendance;
