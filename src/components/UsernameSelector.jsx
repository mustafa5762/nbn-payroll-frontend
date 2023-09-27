import React from "react";
import PropTypes from "prop-types";

const UsernameSelector = ({ label, usernames, selectedUsername, onChange }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center">
      <label
        className={`block text-[#5792cf] font-medium ${label !== "From"? "md:w-36" : "md:w-16"} text-right`}
        htmlFor={label}
      >
        {label}
      </label>
      <div className="relative ml-3 w-full md:w-[300px]">
        <select
          id={label}
          value={selectedUsername}
          onChange={onChange}
          className="appearance-none bg-[#5792cf] border rounded-md w-full py-2 px-3 text-white focus:outline-none focus:border focus:border-white"
        >
          {usernames.map((username) => (
            <option key={username} value={username}>
              {username}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
</svg>

        </div>
      </div>
    </div>
  );
};

UsernameSelector.propTypes = {
  label: PropTypes.string.isRequired,
  usernames: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedUsername: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default UsernameSelector;
