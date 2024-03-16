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
            <button className="bg-red-500 px-5 py-2  my-6 ">
        <Link to="/admin/createMembership" className='text-white text-[1.2rem]'><i class="fa-solid fa-plus"></i> Create Membership</Link>
      </button>
      <h2 className="text-2xl font-bold mb-4">Memberships</h2>
      {error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        <div className="overflow-x-auto">
          <div className="max-h-[700px] overflow-y-auto">
            <table className="w-full border border-gray-200 divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {memberships.map((membership, index) => (
                  <tr key={membership.id} className="hover:bg-gray-100">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{membership.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{membership.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{membership.price}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{membership.duration}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
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
