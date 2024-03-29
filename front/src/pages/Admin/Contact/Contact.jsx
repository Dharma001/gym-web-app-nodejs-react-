import React, { useState, useEffect } from 'react';
import { fetchWithAuth } from '../../../Auths/api';
import { Link } from "react-router-dom";

function Contact() {
    const [contacts, setcontacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const response = await fetchWithAuth('get', 'contacts');
                setcontacts(response.data);
                setLoading(false);
            } catch (error) {
                setError('Failed to fetch contact list.');
                setLoading(false);
            }
        };

        fetchContacts();
    }, []);

    const handleDeleteContact = async (contactId) => {
        try {
          await fetchWithAuth('delete', `contacts/${contactId}`);
          setcontacts(contacts.filter(contact => contact.id !== contactId));
        } catch (error) {
          setError(error.message);
        }
      };
    
    return (
        <div className="px-4 py-4">
            <h2 className="text-2xl font-bold mb-4">Contact Submissions</h2>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p className="text-red-500">Error: {error}</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full border border-gray-200 divide-y divide-gray-200">
                        <thead className="bg-slate-800">
                            <tr>
                                <th className="px-6 text-white py-3 text-[.9rem] font-semibold uppercase tracking-wider">ID</th>
                                <th className="px-6 text-white py-3 text-[.9rem] font-semibold uppercase tracking-wider">First Name</th>
                                <th className="px-6 text-white py-3 text-[.9rem] font-semibold uppercase tracking-wider">Last Name</th>
                                <th className="px-6 text-white py-3 text-[.9rem] font-semibold uppercase tracking-wider">Email</th>
                                <th className="px-6 text-white py-3 text-[.9rem] font-semibold uppercase tracking-wider">Phone</th>
                                <th className="px-6 text-white py-3 text-[.9rem] font-semibold uppercase tracking-wider">Description</th>
                                <th className="px-6 text-white py-3 text-[.9rem] font-semibold uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {contacts.map(contact => (
                                <tr key={contact.id} className="hover:bg-gray-100">
                                    <td className="px-6 py-4 whitespace-nowrap text-md text-center">{contact.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-md text-center">{contact.firstName}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-md text-center">{contact.lastName}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-md text-center">{contact.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-md text-center">{contact.phone}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-md text-center">{contact.description}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    <button
                                        className="bg-red-500 px-4 py-3 rounded-sm text-white"
                                        onClick={() => handleDeleteContact(contact.id)}>
                                           <i class="fa-solid fa-trash"></i>
                                    </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Contact;
