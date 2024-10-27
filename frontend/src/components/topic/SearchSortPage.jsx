import React from 'react';
import topicData from '../../data/DSAQuestion.json';
import './HeroPage.css';

function SearchSortPage() {
  const topic = topicData[3]; // Access the first topic in the array
  const { topicName, questions } = topic; // Destructure topicName and questions

  return (
    <div className="app">
      <div className="content">
        <h2 className="heading">
          {topicName} {/* Display the topic name dynamically */}
        </h2>

        <table className="questions-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Question Name</th>
              <th>Difficulty</th>
              <th>Link</th>
              <th>Additional Link</th> {/* Changed to make it clear it's an additional link */}
            </tr>
          </thead>
          <tbody>
            {questions.map((question, index) => (
              <tr key={index}> {/* Use question index as key */}
                <td>{index + 1}</td>
                <td>{question.Problem}</td> {/* Ensure this matches your JSON structure */}
                <td className={`difficulty ${question.difficulty.toLowerCase()}`}>
                  {question.difficulty}
                </td>
                <td>
                  <a href={question.URL} target="_blank" rel="noreferrer">
                    Go Ahead
                  </a>
                </td>
                <td>
                  <a href={question.URL2} target="_blank" rel="noreferrer">
                    Go Ahead
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SearchSortPage;
