// import React, { useState } from 'react';
// import { useParams } from 'react-router-dom';
// import topicData from '../../data/DSAQuestion.json';
// import './QuestionTable.css';
// import { FiExternalLink, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

// const QuestionTable = () => {
//     const { topicName } = useParams();
//     const formattedTopicName = topicName.replace(/-/g, ' ').replace(/and/g, '&');
//     const [currentPage, setCurrentPage] = useState(1);
//     const questionsPerPage = 10;
    
//     const topic = topicData.find(item => 
//         item.topicName.toLowerCase() === formattedTopicName.toLowerCase()
//     );

//     if (!topic) {
//         return (
//             <div className="error-container">
//                 <h2>Topic not found</h2>
//                 <p>The requested topic does not exist in our database.</p>
//             </div>
//         );
//     }

//     const { questions } = topic;

//     // Calculate pagination
//     const indexOfLastQuestion = currentPage * questionsPerPage;
//     const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
//     const currentQuestions = questions.slice(indexOfFirstQuestion, indexOfLastQuestion);
//     const totalPages = Math.ceil(questions.length / questionsPerPage);

//     const paginate = (pageNumber) => setCurrentPage(pageNumber);
//     const nextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
//     const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

//     return (
//         <div className="table-container">
//             <div className="table-header">
//                 <h1 className="topic-title">{topic.topicName}</h1>
//                 <p className="topic-description">
//                     Master {topic.topicName} with these carefully curated problems
//                 </p>
//             </div>
            
//             <div className="table-wrapper">
//                 <table className="questions-table">
//                     <thead>
//                         <tr>
//                             <th>#</th>
//                             <th>Problem</th>
//                             <th>Difficulty</th>
//                             <th>Links</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {currentQuestions.map((question, index) => (
//                             <tr key={index}>
//                                 <td className="serial-number">{indexOfFirstQuestion + index + 1}</td>
//                                 <td className="problem-name">
//                                     {question.Problem}
//                                     {question.Notes && (
//                                         <span className="problem-notes">{question.Notes}</span>
//                                     )}
//                                 </td>
//                                 <td className={`difficulty ${question.difficulty.toLowerCase()}`}>
//                                     <span className="difficulty-badge">{question.difficulty}</span>
//                                 </td>
//                                 <td className="solution-links">
//                                     <a 
//                                         href={question.URL} 
//                                         target="_blank" 
//                                         rel="noopener noreferrer"
//                                         className="solution-link"
//                                     >
//                                         <FiExternalLink /> Primary
//                                     </a>
//                                     {question.URL2 && (
//                                         <a 
//                                             href={question.URL2} 
//                                             target="_blank" 
//                                             rel="noopener noreferrer"
//                                             className="solution-link"
//                                         >
//                                             <FiExternalLink /> Alternative
//                                         </a>
//                                     )}
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>

//                 {/* Pagination controls */}
//                 <div className="pagination">
//                     <button 
//                         onClick={prevPage} 
//                         disabled={currentPage === 1}
//                         className="pagination-button"
//                     >
//                         <FiChevronLeft />
//                     </button>
                    
//                     {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
//                         <button
//                             key={number}
//                             onClick={() => paginate(number)}
//                             className={`pagination-number ${currentPage === number ? 'active' : ''}`}
//                         >
//                             {number}
//                         </button>
//                     ))}
                    
//                     <button 
//                         onClick={nextPage} 
//                         disabled={currentPage === totalPages}
//                         className="pagination-button"
//                     >
//                         <FiChevronRight />
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default QuestionTable;

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import topicData from '../../data/DSAQuestion.json';
import './QuestionTable.css';
import { FiExternalLink, FiChevronLeft, FiChevronRight, FiCheck } from 'react-icons/fi';
import { useUser } from '@clerk/clerk-react';
import axios from 'axios';

const QuestionTable = () => {
    const { topicName } = useParams();
    const { user } = useUser();
    const formattedTopicName = topicName.replace(/-/g, ' ').replace(/and/g, '&');
    const [currentPage, setCurrentPage] = useState(1);
    const [completedQuestions, setCompletedQuestions] = useState(new Map());
    const questionsPerPage = 10;
    
    const topic = topicData.find(item => 
        item.topicName.toLowerCase() === formattedTopicName.toLowerCase()
    );

    useEffect(() => {
        if (user) {
            fetchUserStats();
        }
    }, [user]);

    const fetchUserStats = async () => {
        try {
            const response = await axios.get(`http://localhost:5003/user/stats/${user.id}`);
            setCompletedQuestions(new Map(Object.entries(response.data.completedQuestions || {})));
        } catch (error) {
            console.error('Error fetching user stats:', error);
        }
    };

    const toggleQuestionCompletion = async (questionId, difficulty) => {
        if (!user) return;
        
        const isCompleted = !isQuestionCompleted(questionId);
        
        try {
            await axios.post('http://localhost:5003/user/toggle-completion', {
                userId: user.id,
                questionId,
                topic: topic.topicName,
                difficulty,
                isCompleted
            });
            
            // Update local state
            const newCompleted = new Map(completedQuestions);
            if (isCompleted) {
                if (!newCompleted.has(topic.topicName)) {
                    newCompleted.set(topic.topicName, []);
                }
                newCompleted.get(topic.topicName).push(questionId);
            } else {
                if (newCompleted.has(topic.topicName)) {
                    const index = newCompleted.get(topic.topicName).indexOf(questionId);
                    if (index > -1) {
                        newCompleted.get(topic.topicName).splice(index, 1);
                    }
                }
            }
            setCompletedQuestions(newCompleted);
        } catch (error) {
            console.error('Error toggling question completion:', error);
        }
    };

    const isQuestionCompleted = (questionId) => {
        return completedQuestions.has(topic.topicName) && 
               completedQuestions.get(topic.topicName).includes(questionId);
    };

    if (!topic) {
        return (
            <div className="error-container">
                <h2>Topic not found</h2>
                <p>The requested topic does not exist in our database.</p>
            </div>
        );
    }

    const { questions } = topic;

    // Calculate pagination
    const indexOfLastQuestion = currentPage * questionsPerPage;
    const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
    const currentQuestions = questions.slice(indexOfFirstQuestion, indexOfLastQuestion);
    const totalPages = Math.ceil(questions.length / questionsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const nextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
    const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

    return (
        <div className="table-container">
            <div className="table-header">
                <h1 className="topic-title">{topic.topicName}</h1>
                <p className="topic-description">
                    Master {topic.topicName} with these carefully curated problems
                </p>
                {completedQuestions.has(topic.topicName) && (
                    <div className="completion-status">
                        Completed: {completedQuestions.get(topic.topicName).length} / {questions.length}
                    </div>
                )}
            </div>
            
            <div className="table-wrapper">
                <table className="questions-table">
                    <thead>
                        <tr>
                            <th>Status</th>
                            <th>#</th>
                            <th>Problem</th>
                            <th>Difficulty</th>
                            <th>Links</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentQuestions.map((question, index) => (
                            <tr key={index}>
                                <td className="completion-checkbox">
                                    <button
                                        onClick={() => toggleQuestionCompletion(question.Problem, question.difficulty)}
                                        className={`checkbox ${isQuestionCompleted(question.Problem) ? 'completed' : ''}`}
                                    >
                                        {isQuestionCompleted(question.Problem) && <FiCheck />}
                                    </button>
                                </td>
                                <td className="serial-number">{indexOfFirstQuestion + index + 1}</td>
                                <td className="problem-name">
                                    {question.Problem}
                                    {question.Notes && (
                                        <span className="problem-notes">{question.Notes}</span>
                                    )}
                                </td>
                                <td className={`difficulty ${question.difficulty.toLowerCase()}`}>
                                    <span className="difficulty-badge">{question.difficulty}</span>
                                </td>
                                <td className="solution-links">
                                    <a 
                                        href={question.URL} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="solution-link"
                                    >
                                        <FiExternalLink /> Primary
                                    </a>
                                    {question.URL2 && (
                                        <a 
                                            href={question.URL2} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="solution-link"
                                        >
                                            <FiExternalLink /> Alternative
                                        </a>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination controls */}
                <div className="pagination">
                    <button 
                        onClick={prevPage} 
                        disabled={currentPage === 1}
                        className="pagination-button"
                    >
                        <FiChevronLeft />
                    </button>
                    
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                        <button
                            key={number}
                            onClick={() => paginate(number)}
                            className={`pagination-number ${currentPage === number ? 'active' : ''}`}
                        >
                            {number}
                        </button>
                    ))}
                    
                    <button 
                        onClick={nextPage} 
                        disabled={currentPage === totalPages}
                        className="pagination-button"
                    >
                        <FiChevronRight />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default QuestionTable;