import React, { useState, useEffect } from 'react';
import { fetchWithAuth } from '../../../Auths/api';
import { Link } from 'react-router-dom';

const MembershipMembers = () => {
  const [membershipMembers, setMembershipMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMembershipMembers = async () => {
      try {
        const response = await fetchWithAuth('get', 'memberMemberships');
        setMembershipMembers(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch membership members.');
        setLoading(false);
      }
    };

    fetchMembershipMembers();
  }, []);

  const handleDeleteMembershipMember = async (id) => {
    try {
      await fetchWithAuth('delete', `membershipMembers/${id}`);
      setMembershipMembers(membershipMembers.filter(member => member.id !== id));
    } catch (error) {
      setError('Failed to delete membership member.');
    }
  };

  return (
    <div className="px-4 py-4">
      <Link to="/admin/CreateMembershipMember" className="bg-blue-500 px-5 py-2 my-6 text-white text-lg rounded-md inline-block"><i className="fas fa-plus"></i> Create Membership</Link>
      <h2 className="text-2xl font-bold mb-4">All Membership Members</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        <div className="overflow-x-auto">
          <div className="max-h-[700px] overflow-y-auto">
            <table className="w-full border border-gray-200 divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Membership Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pay Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {membershipMembers.map(member => (
                  <tr key={member.id} className="hover:bg-gray-100">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{member.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{member.user_id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{member.membership_id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{member.start_date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{member.end_date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{member.pay_amount}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{member.due_amount}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <button onClick={() => handleDeleteMembershipMember(member.id)} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">Delete</button>
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

export default MembershipMembers;
