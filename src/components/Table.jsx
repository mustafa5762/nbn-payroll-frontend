import React from 'react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

function DataTable({ data, onEditClick }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr>
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
              Rate/Hour
            </th>
            <th className="px-2 py-2 w-auto border-2 border-[#5792cf] text-[#5792cf] text-left text-sm leading-4 tracking-wider">
              W Hours
            </th>
            <th className="px-2 py-2 w-auto border-2 border-[#5792cf] text-[#5792cf] text-left text-sm leading-4 tracking-wider">
              Total
            </th>
            <th className="px-2 py-2 w-auto border-2 border-[#5792cf] text-[#5792cf] text-left text-sm leading-4 tracking-wider">
              Overtime
            </th>
            <th className="px-2 py-2 w-auto border-2 border-[#5792cf] text-[#5792cf] text-left text-sm leading-4 tracking-wider">
              OT Calc
            </th>
            <th className="px-2 py-2 w-auto border-2 border-[#5792cf] text-[#5792cf] text-left text-sm leading-4 tracking-wider">
              Driving/Traveling
            </th>
            <th className="px-2 py-2 w-auto border-2 border-[#5792cf] text-[#5792cf] text-left text-sm leading-4 tracking-wider">
              Sickness
            </th>
            <th className="px-2 py-2 w-auto border-2 border-[#5792cf] text-[#5792cf] text-left text-sm leading-4 tracking-wider">
              Other Allowances
            </th>
            <th className="px-2 py-2 w-auto border-2 border-[#5792cf] text-[#5792cf] text-left text-sm leading-4 tracking-wider">
              Grand Total
            </th>
            <th className="px-2 py-2 w-auto border-2 border-[#5792cf] text-[#5792cf] text-left text-sm leading-4 tracking-wider">
              Description
            </th>
            <th className="px-2 py-2 w-auto border-2 border-[#5792cf] text-[#5792cf] text-left text-sm leading-4 tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry) => (
            <tr key={entry.id}>
              <td className="px-2 py-2 w-auto border-b border-[#5792cf] text-[#5792cf] border-r">
                {format(new Date(entry.date), 'yyyy-MM-dd')}
              </td>
              <td className="px-2 py-2 w-auto border-b border-[#5792cf] text-[#5792cf] border-r">
                {entry.employeeName}
              </td>
              <td className="px-2 py-2 w-auto border-b border-[#5792cf] text-[#5792cf] border-r">
                {entry.jobDesignation}
              </td>
              <td className="px-2 py-2 w-auto border-b border-[#5792cf] text-[#5792cf] border-r">
                {entry.ratePerHour}
              </td>
              <td className="px-2 py-2 w-auto border-b border-[#5792cf] text-[#5792cf] border-r">
                {entry.workingHours}
              </td>
              <td className="px-2 py-2 w-auto border-b border-[#5792cf] text-[#5792cf] border-r">
                {entry.total}
              </td>
              <td className="px-2 py-2 w-auto border-b border-[#5792cf] text-[#5792cf] border-r">
                {entry.overtime}
              </td>
              <td className="px-2 py-2 w-auto border-b border-[#5792cf] text-[#5792cf] border-r">
                {entry.otCalculation}
              </td>
              <td className="px-2 py-2 w-auto border-b border-[#5792cf] text-[#5792cf] border-r">
                {entry.driving}
              </td>
              <td className="px-2 py-2 w-auto border-b border-[#5792cf] text-[#5792cf] border-r">
                {entry.sickness}
              </td>
              <td className="px-2 py-2 w-auto border-b border-[#5792cf] text-[#5792cf] border-r">
                {entry.otherAllowances}
              </td>
              <td className="px-2 py-2 w-auto border-b border-[#5792cf] text-[#5792cf] border-r">
                {entry.grandTotal}
              </td>
              <td className="px-2 py-2 w-auto border-b border-[#5792cf] text-[#5792cf] border-r">
                {entry.description}
              </td>
              <td className="px-2 py-2 w-auto border-b border-[#5792cf] text-[#5792cf] border-r">
                <Link
                  to={`/edit_entry/${entry._id}`}
                  className="text-[#5792cf] font-medium underline"
                >
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
