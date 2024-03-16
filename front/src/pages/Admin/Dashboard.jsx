import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { fetchWithAuth } from '../../Auths/api';

function Dashboard() {
  const [usersCountWithRole2, setUsersCountWithRole2] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsersCount = async () => {
      try {
        const response = await fetchWithAuth("get", "users/count");
        setUsersCountWithRole2(response.data.count);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchUsersCount();
  }, []);

  return (
    <div className="grid grid-cols-4 gap-4 mx-4">
                <Link to="/admin/users"className="bg-slate-700 p-4 rounded-md">
      <div>
          <h2 className="text-[1.5rem] font-semibold text-white text-bold">All Members</h2>
          <p className="text-white float-right text-[2.2rem] font-semibold">{usersCountWithRole2}</p>
      </div>
      </Link>
      <Link to="/admin/users"className="bg-blue-700 p-4 rounded-md">
      <div>
          <h2 className="text-[1.5rem] font-semibold text-white text-bold">All Members</h2>
          <p className="text-white float-right text-[2.2rem] font-semibold">{usersCountWithRole2}</p>
      </div>
      </Link>
      <Link to="/admin/users"className="bg-green-700 p-4 rounded-md">
      <div>
          <h2 className="text-[1.5rem] font-semibold text-white text-bold">All Members</h2>
          <p className="text-white float-right text-[2.2rem] font-semibold">{usersCountWithRole2}</p>
      </div>
      </Link>
      <Link to="/admin/users"className="bg-orange-700 p-4 rounded-md">
      <div>
          <h2 className="text-[1.5rem] font-semibold text-white text-bold">All Members</h2>
          <p className="text-white float-right text-[2.2rem] font-semibold">{usersCountWithRole2}</p>
      </div>
      </Link>
    </div>
  );
}

export default Dashboard;
