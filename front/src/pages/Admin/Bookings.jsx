import React, { useState, useEffect } from 'react';
import { fetchWithAuth } from '../../Auths/api';
import { Link } from "react-router-dom";

const AllBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetchWithAuth('get', 'bookings');
        setBookings(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch bookings. Please try again later.');
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleDeleteBooking = async (id) => {
    try {
      await fetchWithAuth('delete', `deleteBooking/${id}`);
      setBookings(bookings.filter(booking => booking.id !== id));
        } catch (error) {
          setError(error.message);
        }
      };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto xl:w-4/5 xl:mx-auto my-6">
      <h2 className="text-2xl font-bold mb-4 my-6">All Bookings</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking Time</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking Date</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {bookings.map((booking, index) => (
              <tr key={booking.id} className={index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{booking.user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{booking.user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{booking.service.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{booking.booking_time}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{booking.booking_date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{booking.status ? 'Booked' : 'Cancelled'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <button onClick={() => handleDeleteBooking(booking.id)} className="text-red-500">Delete</button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <Link to={`/admin/createAssignBooking/${booking.id}`}>
                    <button className="text-blue-500">Create Guide</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllBookings;
