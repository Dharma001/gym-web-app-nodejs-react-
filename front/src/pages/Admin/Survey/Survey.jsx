import React, { useState, useEffect } from 'react';
import { fetchWithAuth } from '../../../Auths/api';
import { Link } from "react-router-dom";

const Surveys = () => {
  const [surveys, setSurveys] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const response = await fetchWithAuth('get', 'surveys');
        setSurveys(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchSurveys();
  }, []);

  return (
    <div className="px-4 py-4">
      <h2 className="text-2xl font-bold mb-4">Surveys</h2>
      {error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        <div className="overflow-x-auto">
          <button className="my-6 ">
            <Link to="/admin/createSurvey" className='bg-gradient-to-br from-purple-500 to-indigo-500 hover:bg-slate-600 text-white px-7 py-2 rounded-sm text-lg transition duration-300 ease-in-out flex items-center'><i className="fa-solid fa-plus"></i> Create Survey</Link>
          </button>
          <div className="max-h-[700px] overflow-y-auto">
            <table className="w-full border border-gray-200 divide-y divide-gray-200">
              <thead className="bg-slate-800">
                <tr>
                  <th className="px-6 text-white py-3 text-[.9rem] font-semibold uppercase tracking-wider">ID</th>
                  <th className="px-6 text-white py-3 text-[.9rem] font-semibold uppercase tracking-wider">Title</th>
                  <th className="px-6 text-white py-3 text-[.9rem] font-semibold uppercase tracking-wider">Description</th>
                  <th className="px-6 text-white py-3 text-[.9rem] font-semibold uppercase tracking-wider">URL</th>
                  <th className="px-6 text-white py-3 text-[.9rem] font-semibold uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {surveys.map((survey, index) => (
                  <tr key={survey.id} className="hover:bg-gray-100">
                    <td className="px-6 py-4 whitespace-nowrap text-md text-center">{survey.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-md text-center">{survey.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-md text-center">{survey.description}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-md text-center">{survey.url}</td>
                    {/* Add actions button */}
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

export default Surveys;
