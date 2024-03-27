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
              <thead className="bg-slate-800">
                <tr>
                  <th className="px-6 text-white py-3 text-[.9rem] font-semibold uppercase tracking-wider">ID</th>
                  <th className="px-6 text-white py-3 text-[.9rem] font-semibold uppercase tracking-wider">User Name</th>
                  <th className="px-6 text-white py-3 text-[.9rem] font-semibold uppercase tracking-wider">Membership Name</th>
                  <th className="px-6 text-white py-3 text-[.9rem] font-semibold uppercase tracking-wider">Start Date</th>
                  <th className="px-6 text-white py-3 text-[.9rem] font-semibold uppercase tracking-wider">End Date</th>
                  <th className="px-6 text-white py-3 text-[.9rem] font-semibold uppercase tracking-wider">Pay Amount</th>
                  <th className="px-6 text-white py-3 text-[.9rem] font-semibold uppercase tracking-wider">Due Amount</th>
                  <th className="px-6 text-white py-3 text-[.9rem] font-semibold uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {membershipMembers.map(member => (
                  <tr key={member.id} className="hover:bg-gray-100">
                    <td className="px-6 py-4 whitespace-nowrap text-md">{member.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-md">{member.user.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-md">{member.membership.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-md">{member.start_date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-md">{member.end_date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-md">{member.pay_amount}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-md">{member.due_amount}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-md">
                      <button onClick={() => handleDeleteMembershipMember(member.id)} 
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-sm transition duration-300 ease-in-out flex items-center"
                  >
                 <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 2048 2048"><path fill="currentColor" d="M1792 384h-128v1472q0 40-15 75t-41 61t-61 41t-75 15H448q-40 0-75-15t-61-41t-41-61t-15-75V384H128V256h512V128q0-27 10-50t27-40t41-28t50-10h384q27 0 50 10t40 27t28 41t10 50v128h512zM768 256h384V128H768zm768 128H384v1472q0 26 19 45t45 19h1024q26 0 45-19t19-45zM768 1664H640V640h128zm256 0H896V640h128zm256 0h-128V640h128z"/></svg> 
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

export default MembershipMembers;
