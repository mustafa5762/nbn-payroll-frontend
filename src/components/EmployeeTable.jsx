import React from 'react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

function DataTable({ data, onEditClick }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="text-center px-2 py-2 w-auto border-2 border-[#5792cf] text-[#5792cf] text-left text-sm leading-4 tracking-wider">
              ID
            </th>
            <th className="text-center px-2 py-2 w-auto border-2 border-[#5792cf] text-[#5792cf] text-left text-sm leading-4 tracking-wider">
              Date
            </th>
            <th className="text-center px-2 py-2 w-auto border-2 border-[#5792cf] text-[#5792cf] text-left text-sm leading-4 tracking-wider">
              Employee Name
            </th>
            <th className="text-center px-2 py-2 w-auto border-2 border-[#5792cf] text-[#5792cf] text-left text-sm leading-4 tracking-wider">
              Job Designation
            </th>
            <th className="text-center px-2 py-2 w-auto border-2 border-[#5792cf] text-[#5792cf] text-left text-sm leading-4 tracking-wider">
              Status
            </th>
            <th className="text-center px-2 py-2 w-auto border-2 border-[#5792cf] text-[#5792cf] text-left text-sm leading-4 tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((employee) => (
            <tr key={employee._id}>
            <td className="text-center px-2 py-2 w-auto border-b border-[#5792cf] text-[#5792cf] border-r border-l">
                {employee.employeeID}
              </td>
              <td className="text-center px-2 py-2 w-auto border-b border-[#5792cf] text-[#5792cf] border-r border-l">
                {format(new Date(employee.jobStartDate), 'yyyy-MM-dd')}
              </td>
              <td className="text-center px-2 py-2 w-auto border-b border-[#5792cf] text-[#5792cf] border-r border-l">
                {employee.employeeName}
              </td>
              <td className="text-center px-2 py-2 w-auto border-b border-[#5792cf] text-[#5792cf] border-r border-l">
                {employee.jobDesignation}
              </td>
              <td className="text-center px-2 py-2 w-auto border-b border-[#5792cf] text-[#5792cf] border-r border-l">
                {employee.status}
              </td>
              <td className="text-center px-2 py-2 w-auto border-b border-[#5792cf] text-[#5792cf] border-r border-l">
                <Link to={`/edit_employee/${employee._id}`} className='text-[#5792cf] underline'>
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
