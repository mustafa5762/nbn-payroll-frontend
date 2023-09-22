import Cookies from 'js-cookie';
import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate();

  const accessToken = Cookies.get('accessToken');

  const handleLogout = () => {
    Cookies.remove('accessToken')
    window.location = '/login'
  }
  return (
    <div>
        <div className="text-5xl text-[#5792cf] text-center py-5 font-bold">NBN PAYROLL SYSTEM</div>
      {accessToken ? 
      <div className="flex justify-center items-center p-2 space-x-8 bg-[#5792cf]">
            <NavLink className={({ isActive }) =>
              isActive
                ? "text-xl text-[#5792cf] bg-white font-medium px-4 py-2"
                : "text-white text-xl font-medium px-4 py-2"
              } 
              to={"/new_entry"}
            >
                New Entry
            </NavLink>
            <NavLink className={({ isActive }) =>
              isActive
                ? "text-xl text-[#5792cf] bg-white font-medium px-4 py-2"
                : "text-white text-xl font-medium px-4 py-2"
              } 
              to={"/daily_report"}
            >
                Daily Report
            </NavLink>
            <NavLink className={({ isActive }) =>
              isActive
                ? "text-xl text-[#5792cf] bg-white font-medium px-4 py-2"
                : "text-white text-xl font-medium px-4 py-2"
              } 
              to={"/monthly_report"}
            >
                Monthly Report
            </NavLink>
            <NavLink className={({ isActive }) =>
              isActive
                ? "text-xl text-[#5792cf] bg-white font-medium px-4 py-2"
                : "text-white text-xl font-medium px-4 py-2"
              } 
              to={"/employee_report"}
            >
                Employee Report
            </NavLink>
            <NavLink className={({ isActive }) =>
              isActive
                ? "text-xl text-[#5792cf] bg-white font-medium px-4 py-2"
                : "text-white text-xl font-medium px-4 py-2"
              } 
              to={"/employees"}
            >
                Employees
            </NavLink>
            <Link className={
               "text-white text-xl font-medium px-4 py-2"
              } 
              onClick={handleLogout}
            >
                Logout
            </Link>
        </div>: null }

    </div>
  )
}

export default Navbar