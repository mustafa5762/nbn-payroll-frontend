import React, { useState, useEffect } from 'react';
import TextField from '../components/Textfield';
import instance from '../axios';
import { useNavigate, useParams } from 'react-router-dom';

function UpdateEmployee() {
  // State variables
  const navigate = useNavigate();

  const params = useParams();
  const { id } = params;

  const [employee, setEmployee] = useState({
    username: "",
    date: "",
    jobDesignation: "",
    status: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    // Fetch the employee data when the component mounts
    fetchEmployeeData();
  }, []);

  const fetchEmployeeData = async () => {
    setLoading(true);

    try {
      const response = await instance.get(`/employee/${id}`);

      if (response.status === 200) {
        const { employeeName, jobStartDate, jobDesignation, status } = response.data.employee;

// Parse the ISO date string into a Date object
const startDate = new Date(jobStartDate);

// Format the Date object into "yyyy-MM-dd" format
const formattedDate = startDate.toISOString().split('T')[0];

setEmployee({
  username: employeeName,
  date: formattedDate,
  jobDesignation,
  status,
});
      } else {
        setErrorMessage("An error occurred while fetching employee data.");
      }
    } catch (error) {
      // Error handling
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e, field) => {
    setEmployee({
      ...employee,
      [field]: e.target.value,
    });
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validation checks for all fields
    if (!employee.date || !employee.jobDesignation || !employee.username || !employee.status) {
      setErrorMessage("All fields are required.");
      setLoading(false);
      setTimeout(() => setErrorMessage(""), 5000);
      return;
    }

    // Create the data object
    const data = {
      jobStartDate: new Date(employee.date).toISOString(), // Convert date to ISO format
      employeeName: employee.username,
      jobDesignation: employee.jobDesignation,
      status: employee.status,
    };

    try {
      const response = await instance.post(`/employee/${id}`, data);

      if (response.status === 200) {
        setSuccessMessage(response.data.message);
      } else {
        setErrorMessage("An error occurred while updating the employee data.");
      }
    } catch (error) {
      // Error handling
      handleApiError(error);
    } finally {
      setLoading(false);
      setTimeout(() => setSuccessMessage(""), 5000);
    }
    navigate('/employees');
  };

  // Function to handle API errors
  const handleApiError = (error) => {
    if (error.response) {
      // The request was made and the server responded with an error status code (4xx or 5xx)
      setErrorMessage(error.response.data.message || "An error occurred while submitting the form.");
    } else if (error.request) {
      // The request was made but no response was received
      setErrorMessage("No response received from the server. Please try again later.");
    } else {
      // Something happened in setting up the request
      setErrorMessage("An error occurred while making the request.");
    }
  };

  // JSX return
  return (
    <div>
        <h1 className="text-4xl mb-4 mt-4 text-[#5792cf] font-bold underline">Update Employee</h1>

      <div className="flex flex-col items-center justify-center mt-40">
        {errorMessage && (
          <div className="bg-red-100 border border-red-400 text-red-900 mb-4 px-4 py-2 rounded-sm">{errorMessage}</div>
        )}
        {successMessage && (
          <div className="text-green-500 mb-4">{successMessage}</div>
        )}
        <form onSubmit={handleSubmit} className="w-full max-w-lg flex flex-col space-y-4">
          <TextField style='border' label="Date" type="date" value={employee.date} onChange={(e) => handleInputChange(e, "date")} />
          <TextField style='border' label="Job Designation" type="text" value={employee.jobDesignation} onChange={(e) => handleInputChange(e, "jobDesignation")} />
          <TextField style='border' label="Employee Name" type="text" value={employee.username} onChange={(e) => handleInputChange(e, "username")} />
          <div>
            <label htmlFor="status" className="block text-gray-700 font-bold">Status</label>
            <select
              id="status"
              className="block w-full mt-1 p-2 border rounded-md"
              value={employee.status}
              onChange={(e) => handleInputChange(e, "status")}
            >
              <option value="onDuty">On Duty</option>
              <option value="offDuty">Off Duty</option>
            </select>
          </div>
          <div className="mt-4">
            <button
              type="submit"
              className="bg-[#5792cf] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateEmployee;
