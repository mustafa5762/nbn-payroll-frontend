import React, { useState, useEffect } from 'react';
import DataTable from '../components/Table';
import instance from '../axios';

function DailyReport() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1); // Current page number
  const [pageSize, setPageSize] = useState(10); // Number of entries per page
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        setLoading(true);
        const response = await instance.get(`/allentries?page=${page}&pageSize=${pageSize}`);
        const data = response.data;
        // Reverse the order of entries before setting in the state
        setEntries(data.entries);
        setTotalPages(data.totalPages);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
  
    fetchEntries();
  }, [page, pageSize]);

  const handlePageClick = (pageNumber) => {
    setPage(pageNumber);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    if (totalPages <= 1) {
      return pageNumbers; // Don't render page numbers if there's only one page.
    }

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageClick(i)}
          disabled={i === page}
          className={`bg-white text-${i === page ? 'orange-500' : 'blue-500'} hover:bg-blue-500 hover:text-white px-3 py-1 rounded-full mr-2 focus:outline-none`}
        >
          {i}
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="p-4">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : entries.length === 0 ? (
        <p>No entries available.</p>
      ) : (
        <>
          <h1 className="text-4xl mb-4 text-[#5792cf] font-bold underline">Daily Report</h1>
          
          <DataTable data={entries} />
        
          <div className="pagination pt-6 mb-8">
            {renderPageNumbers()}
          </div>
        </>
      )}
    </div>
  );
}

export default DailyReport;




