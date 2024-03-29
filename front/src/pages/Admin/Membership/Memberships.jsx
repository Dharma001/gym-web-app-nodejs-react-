import React, { useState, useEffect } from 'react';
import { fetchWithAuth } from '../../../Auths/api';
import { Link } from "react-router-dom";

const Memberships = () => {
  const [memberships, setMemberships] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMemberships = async () => {
      try {
        const response = await fetchWithAuth('get', 'memberships');
        setMemberships(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchMemberships();
  }, []);
  const handleDeleteMembership = async (membershipId) => {
    try {
      await fetchWithAuth('delete', `deleteUser/${membershipId}`);
      setUsers(users.filter(user => user.id !== membershipId));
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="px-4 py-4">
            <button className="my-4">
        <Link to="/admin/createMembership" className='bg-gradient-to-br from-purple-500 to-indigo-500 hover:bg-slate-600 text-white px-7 py-2 rounded-sm text-lg transition duration-300 ease-in-out flex items-center'><i class="fa-solid fa-plus"></i> Create Membership</Link>
      </button>
      <h2 className="text-2xl font-bold mb-4">Memberships</h2>
      {error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        <div className="overflow-x-auto">
          <div className="max-h-[700px] overflow-y-auto">
            <table className="w-full border border-gray-200 divide-y divide-gray-200">
              <thead className="bg-slate-800">
                <tr>
                  <th className="px-6 text-white py-3 text-[.9rem] font-semibold uppercase tracking-wider">ID</th>
                  <th className="px-6 text-white py-3 text-[.9rem] font-semibold uppercase tracking-wider">Name</th>
                  <th className="px-6 text-white py-3 text-[.9rem] font-semibold uppercase tracking-wider">Price</th>
                  <th className="px-6 text-white py-3 text-[.9rem] font-semibold uppercase tracking-wider">Duration</th>
                  <th className="px-6 text-white py-3 text-[.9rem] font-semibold uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {memberships.map((membership, index) => (
                  <tr key={membership.id} className="hover:bg-gray-100">
                    <td className="px-6 py-4 whitespace-nowrap text-md text-center">{membership.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-md text-center">{membership.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-md text-center">{membership.price}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-md text-center">{membership.duration}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-md text-center">
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDeleteMembership(membership.id)}>
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

export default Memberships;
