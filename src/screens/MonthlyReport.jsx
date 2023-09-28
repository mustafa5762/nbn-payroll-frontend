import React, { useState, useEffect } from 'react';
import instance from '../axios';
import DataTable from '../components/MonthlyTable';
import TextField from '../components/Textfield';

function MonthlyReport() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [totalWorkingHours, setTotalWorkingHours] = useState(0);
  const [totalGrandTotal, setTotalGrandTotal] = useState(0);

  useEffect(() => {
    const calculateTotalWorkingHours = (data) => {
      const totalHours = data.reduce((total, entry) => total + entry.workingHours, 0);
      const totalGrand = data.reduce((total, entry) => total + ((entry.ratePerHour * entry.workingHours) + entry.otCalculation + entry.driving + entry.sickness + entry.otherAllowances), 0);
      setTotalWorkingHours(totalHours);
      setTotalGrandTotal(totalGrand);
    };

    if (entries.length > 0) {
      calculateTotalWorkingHours(entries);
    }
  }, [entries]);

  const fetchEntries = async () => {
    try {
      setLoading(true);
      const response = await instance.get(`/entries?startDate=${fromDate}&endDate=${toDate}`);
      const data = response.data;
      setEntries(data.entries);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const areDatesValid = () => {
    return fromDate.trim() !== '' && toDate.trim() !== '';
  };

  return (
    <>
      <div className="flex justify-between items-center p-4">
        <div>
          <h1 className="text-4xl mb-4 text-[#5792cf] font-bold underline">Monthly Report</h1>
        </div>
        <div className="flex items-center space-x-6">
          <TextField
            label='From'
            type='date'
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            style="border"
          />
          <TextField
            label='To'
            type='date'
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            style="border"
          />
          <button
            type="submit"
            className="bg-[#5792cf] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={loading || !areDatesValid()}
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
            <h1 className="text-4xl mb-8 text-[#5792cf] text-center">Report: <span className="font-bold">{fromDate}</span> to <span className="font-bold">{toDate}</span></h1>
            <DataTable data={entries} totalWorkingHours={totalWorkingHours} totalGrandTotal={totalGrandTotal} />
          </>
        )}
      </div>
    </>
  );
}

export default MonthlyReport;


