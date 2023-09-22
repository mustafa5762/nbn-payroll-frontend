import React, { useState, useEffect } from 'react';
import instance from '../axios';
import TextField from '../components/Textfield';
import UsernameSelector from '../components/UsernameSelector';
import DataTable from '../components/EmployeeReportTable';
import nbn from '../assets/nbn.jfif'

function Slip() {
    const [entries, setEntries] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [selectedUsername, setSelectedUsername] = useState('');
    const [usernames, setUsernames] = useState([]); // Initialize as an empty array

    useEffect(() => {
        // Fetch real usernames from the /employeenames endpoint when the component mounts
        async function fetchUsernames() {
            try {
                const response = await instance.get('/employeenames');
                if (response.status === 200) {
                    setUsernames(response.data.employeeNames); // Set the usernames array with the fetched data
                } else {
                    setError("Failed to fetch employee names.");
                }
            } catch (error) {
                setError(error.message);
            }
        }

        fetchUsernames(); // Call the fetchUsernames function when the component mounts
    }, []);

    const fetchEntries = async () => {
        debugger
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
            <div className="flex mb-6 items-center justify-center space-x-6">
                <h1 className="text-4xl mb-4 text-[#5792cf] font-bold underline"> <img src={nbn} width={100} /></h1>
            </div>
            <div className="flex justify-between items-center">
                <div></div>
                {!selectedUsername && !fromDate && !toDate ?
                    <div className="flex items-center ">
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
                            usernames={usernames} // Use the fetched usernames
                            selectedUsername={selectedUsername}
                            onChange={(e) => setSelectedUsername(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="bg-[#5792cf] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            disabled={loading || !areFieldsValid()} // Disable the button if any required field is empty
                            onClick={fetchEntries}
                        >
                            {loading ? "Getting Report..." : "Get Salary Slip"}
                        </button>
                    </div> : null
                }
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
                        <div className='bb2'>
                            <h1 className="text-4xl mb-8 text-[#5792cf] text-center mt-6">Salary Slip of <span className="font-bold">{selectedUsername}</span> <br /> from <span className="font-bold">{fromDate}</span> to <span className="font-bold">{toDate}</span></h1>
                            {/* <DataTable data={entries} /> */}
                        </div>

                        <div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Slip;
