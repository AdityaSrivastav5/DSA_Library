// src/components/Grind75/Grind75.jsx
import React, { useState } from 'react';
import { FiExternalLink } from 'react-icons/fi';
import { useQuery,keepPreviousData, } from '@tanstack/react-query';
import './Grind75.css';
import axios from 'axios';

const Grind75 = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const questionsPerPage = 10;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['dsaProblems', currentPage], 
    queryFn: async () => {
      const response = await axios.get(
        `https://dsa-library.onrender.com/user/grind75-questions?page=${currentPage}&limit=${questionsPerPage}`
        //`http://localhost:5003/user/grind75-questions?page=${currentPage}&limit=${questionsPerPage}`
      );
      if (!response.data) {
        throw new Error('Network response was not ok');
      }
      return response.data;
    },
    placeholderData: keepPreviousData,
  });

  // Change page
  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= data?.totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message || "Something went wrong!"}</p>;

  return (
    <div className="grind75-container">
      <div className="header">
        <h1>Grind 75 Questions</h1>
        <p>The most essential questions to practice for coding interviews</p>
        <p>Total Questions: {data?.totalQuestions || 0}</p>
      </div>

      <div className="questions-table">
        <div className="table-headers">
          <div className="header-item">#</div>
          <div className="header-item">Problem</div>
          <div className="header-item">Difficulty</div>
          <div className="header-item">Topics</div>
          <div className="header-item">Link</div>
        </div>

        {data?.questions?.map((question, index) => (
          <div className="table-row" key={question._id}>
            <div className="row-item serial">{(currentPage - 1) * questionsPerPage + index + 1}</div>
            <div className="row-item name">{question.name}</div>
            <div className={`row-item difficulty ${question.level.toLowerCase()}`}>
              {question.level}
            </div>
            <div className="row-item topics">
              {question.topics[0].join(', ')}
            </div>
            <div className="row-item link">
              <a 
                href={question.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="problem-link"
              >
                <FiExternalLink /> Solve
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button 
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1 || isLoading}
        >
          Previous
        </button>
        
        {Array.from({ length: data?.totalPages || 0 }, (_, i) => i + 1).map(number => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={currentPage === number ? 'active' : ''}
            disabled={isLoading}
          >
            {number}
          </button>
        ))}
        
        <button 
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === data?.totalPages || isLoading}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Grind75;