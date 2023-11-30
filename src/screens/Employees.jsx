import React, { useState, useEffect } from 'react';
import instance from '../axios';
import DataTable from '../components/EmployeeTable';
import { Link } from 'react-router-dom';

function Employees() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        setLoading(true);
        const response = await instance.get('/employees');
        const data = response.data;
        setEntries(data.employees);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchEntries();
  }, []);

  return (
    <div className="p-4 mb-8">
      <div className="flex mb-6 items-center space-x-6">
        <h1 className="text-4xl mb-4 text-[#5792cf] font-bold underline">Employees</h1>
        <Link to="/new_employee" className="bg-[#5792cf] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
  Add New Employee
</Link>      </div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : entries.length === 0 ? (
        <p>No entries available.</p>
      ) : (
        <DataTable data={entries} />
      )}
    </div>
  );
}

export default Employees;
