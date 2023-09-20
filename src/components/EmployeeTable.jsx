import React from 'react';
import { format } from 'date-fns';

function DataTable({ data, onEditClick }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="px-2 py-2 w-auto border-2 border-[#5792cf] text-[#5792cf] text-left text-sm leading-4 tracking-wider">
              ID
            </th>
            <th className="px-2 py-2 w-auto border-2 border-[#5792cf] text-[#5792cf] text-left text-sm leading-4 tracking-wider">
              Date
            </th>
            <th className="px-2 py-2 w-auto border-2 border-[#5792cf] text-[#5792cf] text-left text-sm leading-4 tracking-wider">
              Employee Name
            </th>
            <th className="px-2 py-2 w-auto border-2 border-[#5792cf] text-[#5792cf] text-left text-sm leading-4 tracking-wider">
              Job Designation
            </th>
            <th className="px-2 py-2 w-auto border-2 border-[#5792cf] text-[#5792cf] text-left text-sm leading-4 tracking-wider">
              Status
            </th>
            <th className="px-2 py-2 w-auto border-2 border-[#5792cf] text-[#5792cf] text-left text-sm leading-4 tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((employee) => (
            <tr key={employee._id}>
            <td className="px-2 py-2 w-auto border-b border-[#5792cf] text-[#5792cf] border-r">
                {employee.employeeID}
              </td>
              <td className="px-2 py-2 w-auto border-b border-[#5792cf] text-[#5792cf] border-r">
                {format(new Date(employee.jobStartDate), 'yyyy-MM-dd')}
              </td>
              <td className="px-2 py-2 w-auto border-b border-[#5792cf] text-[#5792cf] border-r">
                {employee.employeeName}
              </td>
              <td className="px-2 py-2 w-auto border-b border-[#5792cf] text-[#5792cf] border-r">
                {employee.jobDesignation}
              </td>
              <td className="px-2 py-2 w-auto border-b border-[#5792cf] text-[#5792cf] border-r">
                {employee.status}
              </td>
              <td className="px-2 py-2 w-auto border-b border-[#5792cf] text-[#5792cf] border-r">
                <button
                  className="text-[#5792cf] font-medium underline"
                  onClick={() => onEditClick(employee._id)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
