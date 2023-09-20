import React, { useState } from 'react';
import TextField from '../components/Textfield';
import instance from '../axios';

function NewEmployee() {
  // State variables
  const [username, setUsername] = useState("");
  const [date, setDate] = useState("");
  const [jobDesignation, setJobDesignation] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (e, setStateFunc) => {
    setStateFunc(e.target.value);
  };


  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validation checks for all fields
    if (!date || !jobDesignation || !username) {
      setErrorMessage("All fields are required.");
      setLoading(false);
      setTimeout(() => setErrorMessage(""), 5000);
      return;
    }

    // Create the data object
    const data = {
      jobStartDate: new Date(date).toISOString(), // Convert date to ISO format
      employeeName: username,
      jobDesignation,
      employeeID: "sad"
    };

    try {
      const response = await instance.post('/employees', data);

      if (response.status === 201) {
        setSuccessMessage(response.data.message);
      } else {
        setErrorMessage("An error occurred while submitting the form.");
      }
    } catch (error) {
      // Error handling
      handleApiError(error);
      setLoading(false)
    } finally {
      // Clear form fields and messages
      clearForm();
      setLoading(false)
      setTimeout(() => setSuccessMessage(""), 5000);
    }
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

  // Function to clear form fields
  const clearForm = () => {
    setUsername("");
    setDate("");
    setJobDesignation("");
  };

  // JSX return
  return (
    <div>
      <div className="flex flex-col items-center justify-center mt-40">
        {errorMessage && (
          <div className="bg-red-100 border border-red-400 text-red-900 mb-4 px-4 py-2 rounded-sm">{errorMessage}</div>
        )}
        {successMessage && (
          <div className="text-green-500 mb-4">{successMessage}</div>
        )}
        <form onSubmit={handleSubmit} className="w-full max-w-lg flex flex-col space-y-4">
          <TextField style='fill' label='Date' type='date' value={date} onChange={(e) => handleInputChange(e, setDate)} />
          <TextField  style='fill'label='Job Designation' type='text' value={jobDesignation} onChange={(e) => handleInputChange(e, setJobDesignation)} />
          <TextField style='fill' label='Employee Name' type='text' value={username} onChange={(e) => handleInputChange(e, setUsername)} />
          <div className="mt-4">
            <button
              type="submit"
              className="bg-[#5792cf] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewEmployee;