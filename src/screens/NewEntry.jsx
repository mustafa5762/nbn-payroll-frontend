import React, { useState, useEffect } from 'react';
import TextField from '../components/Textfield';
import UsernameSelector from '../components/UsernameSelector';
import CheckboxGroup from '../components/CheckboxGroup';
import instance from '../axios';

function NewEntry() {
  // State variables
  const [selectedUsername, setSelectedUsername] = useState("");
  const [date, setDate] = useState("");
  const [jobDesignation, setJobDesignation] = useState("");
  const [ratePerHour, setRatePerHour] = useState("");
  const [workingHours, setWorkingHours] = useState("");
  const [otCalculation, setOtCalculation] = useState("");
  const [drivingTraveling, setDrivingTraveling] = useState("");
  const [sickness, setSickness] = useState("");
  const [otherAllowances, setOtherAllowances] = useState("");
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [usernames, setUsernames] = useState([]); // Initialize as an empty array

  // Data
  const options = ["W:B 6:00 (M-F)", "W:B 18:00 (M-F)", "Work on Saturday", "Work on Sunday", "Work on Red Day"];

  useEffect(() => {
    // Fetch real usernames from the /employeenames endpoint
    async function fetchUsernames() {
      try {
        const response = await instance.get('/employeenames');
        if (response.status === 200) {
          setUsernames(response.data.employeeNames); // Set the usernames array with the fetched data
        } else {
          setErrorMessage("Failed to fetch employee names.");
        }
      } catch (error) {
        handleApiError(error);
      }
    }

    fetchUsernames(); // Call the fetchUsernames function when the component mounts
  }, []);

  // Event handlers for input changes
  const handleCheckboxChange = (values) => {
    setSelectedOptions(values);
  };

  const handleInputChange = (e, setStateFunc) => {
    setStateFunc(e.target.value);
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validation checks for all fields
    if (!date || !jobDesignation || !ratePerHour || !workingHours || !otCalculation || !drivingTraveling || !sickness || !otherAllowances || !description || selectedOptions.length === 0) {
      setErrorMessage("All fields are required.");
      setLoading(false);
      setTimeout(() => setErrorMessage(""), 5000);
      return;
    }

    // Create the data object
    const data = {
      date: new Date(date).toISOString(), // Convert date to ISO format
      employeeName: selectedUsername,
      jobDesignation,
      ratePerHour: parseFloat(ratePerHour),
      workingHours: parseFloat(workingHours),
      otCalculation: parseFloat(otCalculation),
      driving: parseFloat(drivingTraveling),
      travelling: 0, // Set to 0 or your default value
      sickness: parseFloat(sickness),
      otherAllowances: parseFloat(otherAllowances),
      description,
      overtimeOptions: {
        workOnSunday: selectedOptions.includes("Work on Sunday"),
        workOnSaturday: selectedOptions.includes("Work on Saturday"),
        workOnRedDay: selectedOptions.includes("Work on Red Day"),
        workBefore6PM: selectedOptions.includes("W:B 6:00 (M-F)"),
        workAfter6PM: selectedOptions.includes("W:B 18:00 (M-F)"),
      },
    };

    try {
      const response = await instance.post('/entries', data);

      if (response.status === 201) {
        setSuccessMessage(response.data.message);
      } else {
        setErrorMessage("An error occurred while submitting the form.");
      }
    } catch (error) {
      // Error handling
      handleApiError(error);
    } finally {
      // Clear form fields and messages
      clearForm();
      setLoading(false); // Ensure loading state is set to false
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
    setSelectedUsername("");
    setDate("");
    setJobDesignation("");
    setRatePerHour("");
    setWorkingHours("");
    setOtCalculation("");
    setDrivingTraveling("");
    setSickness("");
    setOtherAllowances("");
    setDescription("");
    setSelectedOptions([]);
  };

  // JSX return
  return (
    <div className='p-4'>
      <h1 className="text-4xl mb-4 text-[#5792cf] font-bold underline">New Entry</h1>
      <div className="flex flex-col items-center justify-center">
        {errorMessage && (
          <div className="bg-red-100 border border-red-400 text-red-900 mb-4 px-4 py-2 rounded-sm">{errorMessage}</div>
        )}
        {successMessage && (
          <div className="text-green-500 mb-4">{successMessage}</div>
        )}
        <form onSubmit={handleSubmit} className="w-full max-w-lg flex flex-col space-y-3">
          <TextField style='fill' label='Date' type='date' value={date} onChange={(e) => handleInputChange(e, setDate)} />
          <UsernameSelector
            label="Employee name"
            usernames={usernames} // Use the fetched usernames
            selectedUsername={selectedUsername}
            onChange={(e) => handleInputChange(e, setSelectedUsername)}
          />
          <TextField style="fill" label='Job Designation' type='text' value={jobDesignation} onChange={(e) => handleInputChange(e, setJobDesignation)} />
          <TextField style="fill" label='Rate / Hour' type='number' value={ratePerHour} onChange={(e) => handleInputChange(e, setRatePerHour)} />
          <TextField style="fill" label='Working Hours' type='number' value={workingHours} onChange={(e) => handleInputChange(e, setWorkingHours)} />
          <CheckboxGroup label="Select Options" options={options} selectedValues={selectedOptions} onChange={handleCheckboxChange} />
          <TextField style="fill" label='OT Calculation' type='number' value={otCalculation} onChange={(e) => handleInputChange(e, setOtCalculation)} />
          <TextField style="fill" label='Driving / Traveling' type='number' value={drivingTraveling} onChange={(e) => handleInputChange(e, setDrivingTraveling)} />
          <TextField style="fill" label='Sickness' type='number' value={sickness} onChange={(e) => handleInputChange(e, setSickness)} />
          <TextField style="fill" label='Other Allowances' type='number' value={otherAllowances} onChange={(e) => handleInputChange(e, setOtherAllowances)} />
          <TextField style="fill" label='Description' type='text' value={description} onChange={(e) => handleInputChange(e, setDescription)} />
          <div className="mt-4 flex justify-end">
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

export default NewEntry;

