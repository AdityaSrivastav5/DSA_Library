import './Card.css';
import DSAQuestion from '../../data/DSAQuestion.json';

const Card = () => {
  return (
    <div className="card-container">
      {DSAQuestion.map((card, index) => (
        <div className="card" key={index}>
          <div className="card-content">
            <h2 className="card-title">{card.topicName}</h2>
            <p className="card-body">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio, culpa.
            </p>
            {/* <a href="#" className="button">
              Learn More
            </a> */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
