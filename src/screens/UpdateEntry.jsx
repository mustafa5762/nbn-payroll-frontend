import React, { useState, useEffect } from 'react';
import TextField from '../components/Textfield';
import UsernameSelector from '../components/UsernameSelector';
import CheckboxGroup from '../components/CheckboxGroup';
import instance from '../axios';
import { useParams } from 'react-router-dom';

function UpdateEntry() {
  // State variables
  const [entry, setEntry] = useState({});
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

  // Data
  const usernames = ["user1", "user2", "user3"];
  const options = ["W:B 6:00 (M-F)", "W:B 18:00 (M-F)", "Work on Saturday", "Work on Sunday", "Work on Red Day"];

  const params = useParams();
  const {id} = params;

  // Fetch the entry data based on the provided ID when the component mounts
  useEffect(() => {
    const fetchEntry = async () => {
      try {
        const response = await instance.get(`entry/${id}`);
        setEntry(response.data.entry); // Assuming the API returns the entry data in the expected format
        // Populate form fields with fetched data
        setSelectedUsername(response.data.entry.employeeName);
        const formattedDate = response.data.entry.date ? new Date(response.data.entry.date).toISOString().split('T')[0] : "";
        setDate(formattedDate);
        setJobDesignation(response.data.entry.jobDesignation);
        setRatePerHour(0);
        setWorkingHours(response.data.entry.workingHours);
        setOtCalculation(response.data.entry.otCalculation);
        setDrivingTraveling(response.data.entry.driving);
        setSickness(response.data.entry.sickness);
        setOtherAllowances(response.data.entry.otherAllowances);
        setDescription(response.data.entry.description);
        setSelectedOptions([
          response.data.entry.overtimeOptions.workOnSunday && "Work on Sunday",
          response.data.entry.overtimeOptions.workOnSaturday && "Work on Saturday",
          response.data.entry.overtimeOptions.workOnRedDay && "Work on Red Day",
          response.data.entry.overtimeOptions.workBefore6PM && "W:B 6:00 (M-F)",
          response.data.entry.overtimeOptions.workAfter6PM && "W:B 18:00 (M-F)",
        ].filter(Boolean));
      } catch (error) {
        handleApiError(error);
      }
    };

    fetchEntry();
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
  
    // Create the data object for updating the entry
    const data = {
      date: date ? new Date(date).toISOString() : null,
      employeeName: selectedUsername,
      jobDesignation,
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
      const response = await instance.post(`/entry/${id}`, data);
  
      if (response.status === 200) {
        setSuccessMessage(response.data.message);
      } else {
        setErrorMessage("An error occurred while updating the entry.");
      }
    } catch (error) {
      // Error handling
      handleApiError(error);
    } finally {
      setLoading(false);
      setTimeout(() => setSuccessMessage(""), 5000);
    }
  };

  
  

  // Function to handle API errors
  const handleApiError = (error) => {
    if (error.response) {
      // The request was made and the server responded with an error status code (4xx or 5xx)
      console.log(error.response); // Log the error response for debugging
      setErrorMessage(error.response.data.message || "An error occurred while updating the entry.");
    } else if (error.request) {
      // The request was made but no response was received
      console.log(error.request); // Log the request error for debugging
      setErrorMessage("No response received from the server. Please try again later.");
    } else {
      // Something happened in setting up the request
      console.log(error.message); // Log the general error message for debugging
      setErrorMessage("An error occurred while making the request.");
    }
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
          <TextField style='border' label='Date' type='date' value={date} onChange={(e) => handleInputChange(e, setDate)} />
          <UsernameSelector
            label="Employee name"
            usernames={usernames}
            selectedUsername={selectedUsername}
            onChange={(e) => handleInputChange(e, setSelectedUsername)}
          />
          <TextField style='border' label='Job Designation' type='text' value={jobDesignation} onChange={(e) => handleInputChange(e, setJobDesignation)} />
          <TextField style='border' label='Rate / Hour' type='number' value={ratePerHour} onChange={(e) => handleInputChange(e, setRatePerHour)} />
          <TextField style='border' label='Working Hours' type='number' value={workingHours} onChange={(e) => handleInputChange(e, setWorkingHours)} />
          <CheckboxGroup label="Select Options" options={options} selectedValues={selectedOptions} onChange={handleCheckboxChange} />
          <TextField style='border' label='OT Calculation' type='number' value={otCalculation} onChange={(e) => handleInputChange(e, setOtCalculation)} />
          <TextField style='border' label='Driving / Traveling' type='number' value={drivingTraveling} onChange={(e) => handleInputChange(e, setDrivingTraveling)} />
          <TextField style='border' label='Sickness' type='number' value={sickness} onChange={(e) => handleInputChange(e, setSickness)} />
          <TextField style='border' label='Other Allowances' type='number' value={otherAllowances} onChange={(e) => handleInputChange(e, setOtherAllowances)} />
          <TextField style='border' label='Description' type='text' value={description} onChange={(e) => handleInputChange(e, setDescription)} />
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

export default UpdateEntry;
