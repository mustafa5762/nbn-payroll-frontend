import React from 'react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

function DataTable({ data, totalWorkingHours, totalGrandTotal }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr>
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
              Rate/Hour
            </th>
            <th className="text-center px-2 py-2 w-auto border-2 border-[#5792cf] text-[#5792cf] text-left text-sm leading-4 tracking-wider">
              W Hours
            </th>
            <th className="text-center px-2 py-2 w-auto border-2 border-[#5792cf] text-[#5792cf] text-left text-sm leading-4 tracking-wider">
              Total
            </th>
            <th className="text-center px-2 py-2 w-auto border-2 border-[#5792cf] text-[#5792cf] text-left text-sm leading-4 tracking-wider">
              Overtime
            </th>
            <th className="text-center px-2 py-2 w-auto border-2 border-[#5792cf] text-[#5792cf] text-left text-sm leading-4 tracking-wider">
              OT Calc
            </th>
            <th className="text-center px-2 py-2 w-auto border-2 border-[#5792cf] text-[#5792cf] text-left text-sm leading-4 tracking-wider">
              Driving/Traveling
            </th>
            <th className="text-center px-2 py-2 w-auto border-2 border-[#5792cf] text-[#5792cf] text-left text-sm leading-4 tracking-wider">
              Sickness
            </th>
            <th className="text-center px-2 py-2 w-auto border-2 border-[#5792cf] text-[#5792cf] text-left text-sm leading-4 tracking-wider">
              Other Allowances
            </th>
            <th className="text-center px-2 py-2 w-auto border-2 border-[#5792cf] text-[#5792cf] text-left text-sm leading-4 tracking-wider">
              Grand Total
            </th>
            <th className="text-center px-2 py-2 w-auto border-2 border-[#5792cf] text-[#5792cf] text-left text-sm leading-4 tracking-wider">
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry) => (
            <tr key={entry.id}>
              <td className="text-center px-2 py-2 w-auto border-b border-[#5792cf] text-[#5792cf] border-r border-l">
                {format(new Date(entry.date), 'yyyy-MM-dd')}
              </td>
              <td className="text-center px-2 py-2 w-auto border-b border-[#5792cf] text-[#5792cf] border-r border-l">
                {entry.employeeName}
              </td>
              <td className="text-center px-2 py-2 w-auto border-b border-[#5792cf] text-[#5792cf] border-r border-l">
                {entry.jobDesignation}
              </td>
              <td className="text-center px-2 py-2 w-auto border-b border-[#5792cf] text-[#5792cf] border-r border-l">
                {entry.ratePerHour}
              </td>
              <td className="text-center px-2 py-2 w-auto border-b border-[#5792cf] text-[#5792cf] border-r border-l">
                {entry.workingHours}
              </td>
              <td className="text-center px-2 py-2 w-auto border-b border-[#5792cf] text-[#5792cf] border-r border-l">
                {entry.ratePerHour * entry.workingHours}
              </td>
              <td className="text-center px-2 py-2 w-auto border-b border-[#5792cf] text-[#5792cf] border-r border-l">
                {/* Filter the true values from overtimeOptions and join them with a comma */}
                {Object.keys(entry.overtimeOptions)
                  .filter((key) => entry.overtimeOptions[key] === true)
                  .join(', ')}
              </td>
              <td className="text-center px-2 py-2 w-auto border-b border-[#5792cf] text-[#5792cf] border-r border-l">
                {entry.otCalculation}
              </td>
              <td className="text-center px-2 py-2 w-auto border-b border-[#5792cf] text-[#5792cf] border-r border-l">
                {entry.driving}
              </td>
              <td className="text-center px-2 py-2 w-auto border-b border-[#5792cf] text-[#5792cf] border-r border-l">
                {entry.sickness}
              </td>
              <td className="text-center px-2 py-2 w-auto border-b border-[#5792cf] text-[#5792cf] border-r border-l">
                {entry.otherAllowances}
              </td>
              <td className="text-center px-2 py-2 w-auto border-b border-[#5792cf] text-[#5792cf] border-r border-l">
              {(entry.ratePerHour * entry.workingHours) + entry.otCalculation + entry.driving + entry.sickness + entry.otherAllowances}
              </td>
              <td className="text-center px-2 py-2 w-auto border-b border-[#5792cf] text-[#5792cf] border-r border-l">
                {entry.description}
              </td>
            </tr>
          ))}
                        <tr>
                        <td className="text-center px-2 py-2 w-auto"></td>
                        <td className="text-center px-2 py-2 w-auto"></td>
                <td className="text-center px-2 py-2 w-auto border-[#5792cf] border-r"></td>
                <td className="text-center px-2 py-2 w-auto border-b border-[#5792cf] text-[#5792cf] border-r font-bold">
                  Total Working Hours
                </td>
                <td className="text-center px-2 py-2 w-auto border-b border-[#5792cf] text-[#5792cf] border-r">
                {totalWorkingHours}
                </td>
                <td className="text-center px-2 py-2 w-auto"></td>
                <td className="text-center px-2 py-2 w-auto"></td>
                <td className="text-center px-2 py-2 w-auto"></td>
                <td className="text-center px-2 py-2 w-auto"></td>
                <td className="text-center px-2 py-2 w-auto border-[#5792cf] border-r"></td>
                <td className="text-center font-bold px-2 py-2 w-auto border-b border-[#5792cf] text-[#5792cf] border-r font-bold">
                  Total Pays
                </td>
                <td className="text-center px-2 py-2 w-auto border-b border-[#5792cf] text-[#5792cf] border-r">
                {totalGrandTotal}
                </td>
              </tr>
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;