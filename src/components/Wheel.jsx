import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const colors = [
  'violet', 'blue', 'green', 'lightgreen', 'yellow', 'orange', 
  'red', 'pink', 'purple', 'orangered', 'lightcoral', 'plum'
];

const Wheel = ({ students }) => {
  const [isRotating, setIsRotating] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [finalRotation, setFinalRotation] = useState(0);

  useEffect(() => {
    if (!isRotating && finalRotation !== 0) {
      setRotation(finalRotation % 360);
    }
  }, [isRotating, finalRotation]);

  const startRotation = () => {
    if (students.length === 0) return;

    const randomIndex = Math.floor(Math.random() * students.length);
    const rotations = 5; // Number of complete rotations before stopping
    const additionalRotation = randomIndex * (360 / students.length); // Each segment is 360 / number of students degrees

    // Final rotation value to ensure the wheel stops at the next number
    const newFinalRotation = rotations * 360 + additionalRotation;

    setIsRotating(true);
    setFinalRotation(newFinalRotation);

    setTimeout(() => {
      setIsRotating(false);
    }, 5000); // Adjust the duration for the rotation
  };

  return (
    <div className="wheel-container">
      <div className="arrow"></div>
      <div className="wheel">
        <ul
          className={`wheel ${isRotating ? 'start-rotation' : ''}`}
          style={{
            transform: `rotate(${isRotating ? finalRotation : rotation}deg)`,
            transition: isRotating ? 'transform 5s ease-out' : 'none'
          }}
        >
          {students.map((student, index) => (
            <li key={index} style={{ 
              transform: `rotate(${index * (360 / students.length)}deg)`,
              backgroundColor: colors[index % colors.length],
              clipPath: `polygon(50% 50%, 100% 0, 100% 100%)`, // Creates triangular segments
            }}>
              <div className="text" style={{ 
                transform: `rotate(${90}deg)` // Rotate the text to be horizontal
              }}>
                {student.number}. {student.name}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <button className="spin-button" onClick={startRotation}>Zavrti</button>
    </div>
  );
};

Wheel.propTypes = {
  students: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired,
  })).isRequired,
};

export default Wheel;
