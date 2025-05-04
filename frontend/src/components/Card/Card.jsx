import './Card.css';
import DSAQuestion from '../../data/DSAQuestion.json';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaCode, FaProjectDiagram, FaBrain, FaCalculator, FaNetworkWired, FaChartBar } from 'react-icons/fa';

const iconMap = {
  'Array': <FaChartBar />,
  'Linked List': <FaNetworkWired />,
  'Binary Trees': <FaProjectDiagram />,
  'Graph': <FaProjectDiagram />,
  'Dynamic Programming': <FaBrain />,
  'Recursion': <FaBrain />,
  'Search & Sort': <FaCalculator />,
  // Add more mappings as needed
};

const Card = () => {
  const cardRefs = useRef([]);

  const handleMouseMove = (e, index) => {
    const card = cardRefs.current[index];
    if (!card) return;
    
    const { clientX, clientY } = e;
    const { left, top, width, height } = card.getBoundingClientRect();

    const x = (clientX - left - width / 2) / 25;
    const y = (clientY - top - height / 2) / 25;

    card.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`;
    card.style.boxShadow = `${-x * 2}px ${y * 2}px 30px rgba(0, 180, 216, 0.3)`;
  };

  const handleMouseLeave = (index) => {
    const card = cardRefs.current[index];
    if (!card) return;
    
    card.style.transform = 'rotateY(0deg) rotateX(0deg)';
    card.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3)';
  };

  const getIcon = (topicName) => {
    return iconMap[topicName] || <FaCode />;
  };

  return (
    <div className="card-container">
      {DSAQuestion.map((card, index) => (
        <Link 
          to={`/${card.topicName
            .replace(/\s+/g, '-')
            .replace(/&/g, 'and')
            .toLowerCase()}`}
          key={index}
          className="card-link"
        >
          <div
            className="card"
            ref={(el) => (cardRefs.current[index] = el)}
            onMouseMove={(e) => handleMouseMove(e, index)}
            onMouseLeave={() => handleMouseLeave(index)}
          >
            <div className="card-content">
              <div className="card-icon">
                {getIcon(card.topicName)}
              </div>
              <h2 className="card-title">{card.topicName}</h2>
              <p className="card-description">
                {card.questions.length} curated problems to master this topic
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Card;