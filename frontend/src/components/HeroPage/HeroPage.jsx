import React from "react";
import "./HeroPage.css";

const HeroPage = () => {
  const questions = [
    { id: 1, name: "Stock Buy and Sell", link: "#", difficulty: "Easy" },
    { id: 2, name: "Two Sum", link: "#", difficulty: "Medium" },
    { id: 3, name: "Valid Parentheses", link: "#", difficulty: "Medium" },
    { id: 4, name: "Set Matrix Zero's", link: "#", difficulty: "Hard" },
    { id: 1, name: "Stock Buy and Sell", link: "#", difficulty: "Easy" },
    { id: 2, name: "Two Sum", link: "#", difficulty: "Medium" },
    { id: 3, name: "Valid Parentheses", link: "#", difficulty: "Medium" },
    { id: 4, name: "Set Matrix Zero's", link: "#", difficulty: "Hard" },
  ];

  return (
    <div className="app">
      <div className="content">
        <h2 className="heading">
          Array
        </h2>

        <table className="questions-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Question Name</th>
              <th>Status</th>
              <th>Link</th>
              <th>Difficulty</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((question, index) => (
              <tr key={question.id}>
                <td>{index + 1}</td>
                <td>{question.name}</td>
                <td>
                  <input type="checkbox" />
                </td>
                <td>
                  <a href={question.link} target="_blank" rel="noreferrer">
                    Go Ahead
                  </a>
                </td>
                <td className={`difficulty ${question.difficulty.toLowerCase()}`}>
                  {question.difficulty}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HeroPage;
