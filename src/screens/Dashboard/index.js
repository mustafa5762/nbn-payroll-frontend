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
            <h1 className="tu">Dashboard</h1>

            <div class="grid-container">
                <div class="grid-item">
                    <h2>Employees</h2>
                    <p>{entries.length}</p>
                </div>
                <div class="grid-item">
                    <h2>Item 2</h2>
                    <p className="bgblue">2</p>
                </div>
                <div class="grid-item">
                    <h2 className="bgblue">Item 3</h2>
                    <p>3</p>
                </div>
            </div>
        </>
        )}
        </>
    )
}

export default Dashboard;