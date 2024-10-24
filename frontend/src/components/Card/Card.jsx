// import './Card.css';
// import DSAQuestion from '../../data/DSAQuestion.json';
// import { useRef } from 'react';

// const Card = () => {
//   const cardRefs = useRef([]);

//   const handleMouseMove = (e, index) => {
//     const card = cardRefs.current[index];
//     const { clientX, clientY } = e;
//     const { left, top, width, height } = card.getBoundingClientRect();

//     const x = (clientX - left) / width - 0.5; // Normalized x position
//     const y = (clientY - top) / height - 0.5; // Normalized y position

//     // Set tilt values
//     const tiltX = y * 15; // Adjust tilt range
//     const tiltY = -x * 15; // Adjust tilt range

//     card.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
//   };

//   const handleMouseLeave = (index) => {
//     const card = cardRefs.current[index];
//     card.style.transform = `rotateX(0) rotateY(0)`; // Reset tilt
//   };

//   return (
//     <div className="card-container">
//       {DSAQuestion.map((card, index) => (
//         <div
//           className="card"
//           key={index}
//           ref={(el) => (cardRefs.current[index] = el)}
//           onMouseMove={(e) => handleMouseMove(e, index)}
//           onMouseLeave={() => handleMouseLeave(index)}
//         >
//           <div className="card-content">
//             <h2 className="card-title">{card.topicName}</h2>
//             {/* <p className="card-body">
//               Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio, culpa.
//             </p> */}
//             {/* <a href="#" className="button">
//               Learn More
//             </a> */}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Card;

import './Card.css';
import DSAQuestion from '../../data/DSAQuestion.json';
import { useRef } from 'react';
import { Link } from 'react-router-dom'; // Import Link component

const Card = () => {
  const cardRefs = useRef([]);

  const handleMouseMove = (e, index) => {
    const card = cardRefs.current[index];
    const { clientX, clientY } = e;
    const { left, top, width, height } = card.getBoundingClientRect();

    const x = (clientX - left) / width - 0.5; // Normalized x position
    const y = (clientY - top) / height - 0.5; // Normalized y position

    // Set tilt values
    const tiltX = y * 20; // Adjust tilt range
    const tiltY = -x * 20; // Adjust tilt range

    card.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
  };

  const handleMouseLeave = (index) => {
    const card = cardRefs.current[index];
    card.style.transform = `rotateX(0) rotateY(0)`; // Reset tilt
  };

  return (
    <div className="card-container">
      {DSAQuestion.map((card, index) => (
        <Link 
        to={`/${card.topicName
          .replace(/\s+/g, '-')      // Replace spaces with hyphens
          .replace(/&/g, 'and')      // Replace '&' with 'and'
          .toLowerCase()}`}          // Convert everything to lowercase
        key={index}>

          <div
            className="card"
            ref={(el) => (cardRefs.current[index] = el)}
            onMouseMove={(e) => handleMouseMove(e, index)}
            onMouseLeave={() => handleMouseLeave(index)}
          >
            <div className="card-content">
              <h2 className="card-title">{card.topicName}</h2>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Card;
