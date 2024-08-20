import './Card.css';

const cards = [
  { title: 'Array' },
  { title: 'Linked List' },
  { title: 'Hash Map' },
  { title: 'Tree' },
  { title: 'DP' },
  { title: 'String' },
];

const Card = () => {
  return (
    <div className="card-container">
      {cards.map((card, index) => (
        <div className="card" key={index}>
          <div className="card-content">
            <h2 className="card-title">{card.title}</h2>
            <p className="card-body">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio, culpa.
            </p>
            <a href="#" className="button">
              Learn More
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
