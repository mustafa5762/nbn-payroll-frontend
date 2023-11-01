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
        <div  className="text-5xl text-[#5792cf] text-center py-4 font-bold"><Link to={"/"}>NBN PAYROLL SYSTEM </Link></div>
      {accessToken ? 
      <div className="flex justify-center items-center p-1 space-x-8 bg-[#5792cf]">
            <NavLink className={({ isActive }) =>
              isActive
                ? "text-lg text-[#5792cf] bg-white font-medium px-4 py-2"
                : "text-white text-lg font-medium px-4 py-2"
              } 
              to={"/new_entry"}
            >
                New Entry
            </NavLink>
            <NavLink className={({ isActive }) =>
              isActive
                ? "text-lg text-[#5792cf] bg-white font-medium px-4 py-2"
                : "text-white text-lg font-medium px-4 py-2"
              } 
              to={"/daily_report"}
            >
                Daily Report
            </NavLink>
            <NavLink className={({ isActive }) =>
              isActive
                ? "text-lg text-[#5792cf] bg-white font-medium px-4 py-2"
                : "text-white text-lg font-medium px-4 py-2"
              } 
              to={"/monthly_report"}
            >
                Monthly Report
            </NavLink>
            <NavLink className={({ isActive }) =>
              isActive
                ? "text-lg text-[#5792cf] bg-white font-medium px-4 py-2"
                : "text-white text-lg font-medium px-4 py-2"
              } 
              to={"/employee_report"}
            >
                Employee Report
            </NavLink>
            <NavLink className={({ isActive }) =>
              isActive
                ? "text-lg text-[#5792cf] bg-white font-medium px-4 py-2"
                : "text-white text-lg font-medium px-4 py-2"
              } 
              to={"/employees"}
            >
                Employees
            </NavLink>
            <Link className={
               "text-white text-lg font-medium px-4 py-2"
              } 
              onClick={handleLogout}
            >
                Logout
            </Link>
        </div>: null }
<div className='footer'>
  <h3>Copyrights 2023 @ NBN Payroll System</h3>
  </div>


    </div>
  )
}

export default Navbar