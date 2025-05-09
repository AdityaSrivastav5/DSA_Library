// src/components/Grind75/Grind75.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiExternalLink } from 'react-icons/fi';
import './Grind75.css';

const Grind75 = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const questionsPerPage = 10;

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("https://dsa-library.onrender.com/user/grind75-questions");
        if (!response.ok) {
            throw new Error('Failed to fetch questions');
        }
        const data = await response.json();
        setQuestions(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  // Get current questions
  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = questions.slice(indexOfFirstQuestion, indexOfLastQuestion);
  const totalPages = Math.ceil(questions.length / questionsPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) return <div className="loading">Loading questions...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="grind75-container">
      <div className="header">
        <h1>Grind 75 Questions</h1>
        <p>The most essential questions to practice for coding interviews</p>
      </div>

      <div className="questions-table">
        <div className="table-headers">
          <div className="header-item">#</div>
          <div className="header-item">Problem</div>
          <div className="header-item">Difficulty</div>
          <div className="header-item">Topics</div>
          <div className="header-item">Link</div>
        </div>

        {currentQuestions.map((question, index) => (
          <div className="table-row" key={question._id}>
            <div className="row-item serial">{indexOfFirstQuestion + index + 1}</div>
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
          onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={currentPage === number ? 'active' : ''}
          >
            {number}
          </button>
        ))}
        
        <button 
          onClick={() => paginate(currentPage < totalPages ? currentPage + 1 : totalPages)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Grind75;