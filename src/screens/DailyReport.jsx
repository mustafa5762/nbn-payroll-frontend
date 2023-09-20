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

    // Always add the first page
    pageNumbers.push(
      <button
        key={1}
        onClick={() => handlePageClick(1)}
        disabled={page === 1}
        className={`bg-white text-blue-500 hover:bg-blue-500 hover:text-white px-3 py-1 rounded-full mr-2 focus:outline-none`}
      >
        {1}
      </button>
    );

    // Add ellipsis if there are pages before the current page
    if (page > 3) {
      pageNumbers.push(
        <span key="ellipsis-left">...</span>
      );
    }

    // Calculate the range of page numbers to display around the current page
    const start = Math.max(2, page - 1);
    const end = Math.min(totalPages - 1, page + 1);

    for (let i = start; i <= end; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageClick(i)}
          disabled={i === page}
          className={`bg-white text-blue-500 hover:bg-blue-500 hover:text-white px-3 py-1 rounded-full mr-2 focus:outline-none`}
        >
          {i}
        </button>
      );
    }

    // Add ellipsis if there are pages after the current page
    if (page < totalPages - 2) {
      pageNumbers.push(
        <span key="ellipsis-right">...</span>
      );
    }

    // Always add the last page
    pageNumbers.push(
      <button
        key={totalPages}
        onClick={() => handlePageClick(totalPages)}
        disabled={page === totalPages}
        className={`bg-white text-blue-500 hover:bg-blue-500 hover:text-white px-3 py-1 rounded-full mr-2 focus:outline-none`}
      >
        {totalPages}
      </button>
    );

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
          <div className="pagination pt-6">
            {renderPageNumbers()}
          </div>
        </>
      )}
    </div>
  );
}

export default DailyReport;




