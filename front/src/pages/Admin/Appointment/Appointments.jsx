import React, { useState, useEffect } from 'react';
import { fetchWithAuth } from '../../../Auths/api';
import { Link } from "react-router-dom";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);

  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetchWithAuth('get', 'appointments');
        setAppointments(response.data); 
      } catch (error) {
        setError(error.message);
      }
    };

    fetchAppointments();
  }, []);

  // const handleDeleteAppointment = async (appointmentId) => {
  //   try {
  //     await fetchWithAuth('delete', `appointments/${appointmentId}`);
  //     setAppointments(appointments.filter(appointment => appointment.id !== appointmentId));
  //   } catch (error) {
  //     setError(error.message);
  //   }
  // };

  return (
    <div className="px-4 py-4">
      <h2 className="text-2xl font-bold mb-4">Appointments</h2>
      {error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        <div className="overflow-x-auto">
          <button className="my-6 ">
            <Link to="/admin/CreateAppointment" className='bg-gradient-to-br from-purple-500 to-indigo-500 hover:bg-slate-600 text-white px-7 py-2 rounded-sm text-lg transition duration-300 ease-in-out flex items-center'><i className="fa-solid fa-plus"></i> Create Appointment</Link>
          </button>
          <div className="max-h-[700px] overflow-y-auto">
            <table className="w-full border border-gray-200 divide-y divide-gray-200">
              <thead className="bg-slate-800">
                <tr>
                  <th className="px-6 text-white py-3 text-[.9rem] font-semibold uppercase tracking-wider">ID</th>
                  <th className="px-6 text-white py-3 text-[.9rem] font-semibold uppercase tracking-wider">First Name</th>
                  <th className="px-6 text-white py-3 text-[.9rem] font-semibold uppercase tracking-wider">Last Name</th>
                  <th className="px-6 text-white py-3 text-[.9rem] font-semibold uppercase tracking-wider">Email</th>
                  <th className="px-6 text-white py-3 text-[.9rem] font-semibold uppercase tracking-wider">Appointment Date</th>
                  <th className="px-6 text-white py-3 text-[.9rem] font-semibold uppercase tracking-wider">Appointment Time</th>
                  <th className="px-6 text-white py-3 text-[.9rem] font-semibold uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {appointments.map((appointment, index) => (
                  <tr key={appointment.id} className="hover:bg-gray-100">
                    <td className="px-6 py-4 whitespace-nowrap text-md text-center">{appointment.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-md text-center">{appointment.first_name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-md text-center">{appointment.last_name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-md text-center">{appointment.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-md text-center">{appointment.appointment_date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-md text-center">{appointment.appointment_time}</td>
                    {/* <td className="px-6 py-4 whitespace-nowrap text-md text-center">
                      <button
                        className="bg-red-500 px-4 py-3 rounded-sm text-white"
                        onClick={() => handleDeleteAppointment(appointment.id)}
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointments;
