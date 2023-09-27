import { useEffect, useState } from "react";
import instance from "../../axios";
import "./index.css"

const Dashboard = () => {
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

  // Filter active and inactive employees based on their status
  const activeEmployees = entries.filter(employee => employee.status === 'onDuty');
  const inactiveEmployees = entries.filter(employee => employee.status === 'offDuty');

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : entries.length === 0 ? (
        <p>No entries available.</p>
      ) : (
        <>
          <div className="marquee-container">
            <div className="marquee-text">Welcome to <b>Nbn Payroll System!!</b></div>
          </div>
          <h1 className="text-4xl mb-4 ml-4 mt-4 text-[#5792cf] font-bold underline">Dashboard</h1>

          <div className="grid-container">
            <div className="grid-item">
              <h2>Total Employees</h2>
              <p>{entries.length}</p>
            </div>
            <div className="grid-item">
              <h2>Active Employees</h2>
              <p className="bgblue">{activeEmployees.length}</p>
            </div>
            <div className="grid-item">
              <h2 className="bgblue">Inactive Employees</h2>
              <p>{inactiveEmployees.length}</p>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default Dashboard;
