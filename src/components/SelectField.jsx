import React from "react";
import PropTypes from "prop-types";

const SelectField = ({ label, value, onChange }) => {
  const selectStyle = {
    border: {
      border: "1px solid #5792cf",
      backgroundColor: "transparent",
      color: "#5792cf",
    },
  };

  const selectInputStyle = selectStyle.border || {}; // Default to 'border' style if not recognized

  return (
    <div className="flex flex-col md:flex-row md:items-center">
      <label
        className={`block text-[#5792cf] font-medium ${
          label !== "From" && label !== "To"
            ? "md:w-36"
            : label === "To"
            ? "md:w-12"
            : "md:w-16"
        } text-right`}
        htmlFor={label}
      >
        {label}
      </label>
      <select
        id={label}
        value={value}
        onChange={onChange}
        style={selectInputStyle}
        className="ml-3 rounded-md w-full md:w-[300px] py-2 px-3 text-white focus:outline-none focus:border focus:border-white"
      >
        <option value="onDuty" style={{ color: "green" }}>
          On Duty
        </option>
        <option value="offDuty" style={{ color: "red" }}>
          Dismiss
        </option>
      </select>
    </div>
  );
};

SelectField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SelectField;
