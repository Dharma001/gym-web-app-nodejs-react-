import React, { useState, useEffect } from 'react';
import { fetchWithAuth } from '../../../Auths/api';
import { Link } from "react-router-dom";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetchWithAuth('get', 'notifications');
        setNotifications(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchNotifications();
  }, []);

  const handleDeleteNotification = async (notificationId) => {
    try {
      await fetchWithAuth('delete', `notifications/${notificationId}`);
      setNotifications(notifications.filter(notification => notification.id !== notificationId));
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="px-4 py-4">
      <h2 className="text-2xl font-bold mb-4">Notifications</h2>
      {error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        <div className="overflow-x-auto">
                        <button className="my-6 ">
        <Link to="/admin/createNotification" className='bg-gradient-to-br from-purple-500 to-indigo-500 hover:bg-slate-600 text-white px-7 py-2 rounded-sm text-lg transition duration-300 ease-in-out flex items-center'><i class="fa-solid fa-plus"></i> Create Notification</Link>
      </button>
          <div className="max-h-[700px] overflow-y-auto">
            <table className="w-full border border-gray-200 divide-y divide-gray-200">
              <thead className="bg-slate-800">
                <tr>
                  <th className="px-6 text-white py-3 text-[.9rem] font-semibold uppercase tracking-wider">ID</th>
                  <th className="px-6 text-white py-3 text-[.9rem] font-semibold uppercase tracking-wider">Title</th>
                  <th className="px-6 text-white py-3 text-[.9rem] font-semibold uppercase tracking-wider">Description</th>
                  <th className="px-6 text-white py-3 text-[.9rem] font-semibold uppercase tracking-wider">Announcement Date</th>
                  <th className="px-6 text-white py-3 text-[.9rem] font-semibold uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {notifications.map((notification, index) => (
                  <tr key={notification.id} className="hover:bg-gray-100">
                    <td className="px-6 py-4 whitespace-nowrap text-md text-center">{notification.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-md text-center">{notification.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-md text-center">{notification.description}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-md text-center">{notification.announcementDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-md text-center">
                      <button
                                                 className="bg-red-500 px-4 py-3 rounded-sm text-white"

                        onClick={() => handleDeleteNotification(notification.id)}>
                                                               <i class="fa-solid fa-trash"></i>

                      </button>
                    </td>
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

export default Notifications;
