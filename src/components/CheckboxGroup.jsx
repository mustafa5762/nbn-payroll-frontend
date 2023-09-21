import React from "react";
import PropTypes from "prop-types";

const CheckboxGroup = ({ label, options, selectedValues, onChange }) => {
  const handleCheckboxChange = (option) => {
    const updatedValues = selectedValues.includes(option)
      ? selectedValues.filter((value) => value !== option)
      : [...selectedValues, option];

    onChange(updatedValues);
  };

  return (
    <div className=" ml-12  mb-4 flex flex-col md:flex-row md:items-center">
      <label className="block text-[#5792cf] font-small md:w-28 text-right">{label}</label>
      <div className="flex justify-start ml-4 flex-wrap font-small">
        {options.map((option) => (
          <label key={option} className="inline-flex items-center mt-2 mr-4">
            <input
              type="checkbox"
              value={option}
              checked={selectedValues.includes(option)}
              onChange={() => handleCheckboxChange(option)}
              className="form-checkbox h-5 w-5 text-[#5792cf]"
            />
            <span className="ml-2 text-[#5792cf]">{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

CheckboxGroup.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedValues: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CheckboxGroup;

