import React, { useState } from 'react';
import instance from '../axios';
import TextField from '../components/Textfield';
import UsernameSelector from '../components/UsernameSelector';
import DataTable from '../components/EmployeeReportTable';

function EmployeeReport() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [selectedUsername, setSelectedUsername] = useState('');

  const usernames = ["user1", "user2", "user3"];

  const fetchEntries = async () => {
    try {
      setLoading(true);
      const response = await instance.get(`/entriesofemployeer?startDate=${fromDate}&endDate=${toDate}&employeeName=${selectedUsername}`);
      const data = response.data;
      setEntries(data.entries);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // Function to check if all required fields are provided
  const areFieldsValid = () => {
    return fromDate.trim() !== '' && toDate.trim() !== '' && selectedUsername.trim() !== '';
  };

  return (
    <div className='p-4'>
      <div className="flex mb-6 items-center space-x-6">
        <h1 className="text-4xl mb-4 text-[#5792cf] font-bold underline">Employee Report</h1>
        <button className="bg-[#5792cf] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Salary Slip</button>
      </div>
      <div className="flex justify-between items-center">
        <div></div>
        <div className="flex items-center space-x-6">
          <TextField
            label='From'
            type='date'
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            style='border'
          />
          <TextField
            label='To'
            type='date'
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            style='border'
          />
          <UsernameSelector
            label="Employee name"
            usernames={usernames}
            selectedUsername={selectedUsername}
            onChange={(e) => setSelectedUsername(e.target.value)}
          />
          <button
            type="submit"
            className="bg-[#5792cf] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={loading || !areFieldsValid()} // Disable the button if any required field is empty
            onClick={fetchEntries}
          >
            {loading ? "Getting Report..." : "Get Report"}
          </button>
        </div>
      </div>
      <div className="p-4">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : entries.length === 0 ? (
          <p>No entries available.</p>
        ) : (
          <>
            <h1 className="text-4xl mb-8 text-[#5792cf] text-center mt-6">Monthly Report of <span className="font-bold">{selectedUsername}</span> <br /> from <span className="font-bold">{fromDate}</span> to <span className="font-bold">{toDate}</span></h1>
            <DataTable data={entries} />
          </>
        )}
      </div>
    </div>
  );
}

export default EmployeeReport;