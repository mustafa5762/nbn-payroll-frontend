import React from "react";
import PropTypes from "prop-types";

const TextField = ({ label, type, value, onChange, style }) => {
  // Define styles based on the 'style' prop
  const inputStyles = {
    fill: {
      backgroundColor: "#5792cf",
      border: "none",
      color: "white",
    },
    border: {
      border: "1px solid #5792cf",
      backgroundColor: "transparent",
      color: "#5792cf",
    },
  };

  const inputStyle = inputStyles[style] || {}; // Default to 'fill' style if not recognized

  return (
    <div className="flex flex-col md:flex-row md:items-center">
      <label
        className="block text-[#5792cf] font-medium md:w-36 text-right"
        htmlFor={label}
      >
        {label}
      </label>
      <input
        type={type}
        id={label}
        value={value}
        onChange={onChange}
        style={inputStyle}
        className="ml-3 rounded-md w-full md:w-[300px] py-2 px-3 text-white focus:outline-none focus:border focus:border-white"
      />
    </div>
  );
};

TextField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["text", "number"]).isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  style: PropTypes.oneOf(["fill", "border"]).isRequired, // New 'style' prop
};

export default TextField;


