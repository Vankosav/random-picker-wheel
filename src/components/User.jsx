import React, { useState } from 'react';
import PropTypes from 'prop-types';

const User = ({ students, setStudents }) => {
  const [studentName, setStudentName] = useState('');

  const addStudent = () => {
    if (studentName.trim()) {
      const upperCaseName = studentName.charAt(0).toUpperCase() + studentName.slice(1);
      // Calculate the next student number
      const studentNumber = students.length + 1;
      setStudents([...students, { name: upperCaseName.trim(), number: studentNumber }]);
      setStudentName('');
    }
  };

  const removeStudent = (name) => {
    setStudents(students.filter(student => student.name !== name));
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      addStudent();
    }
  };

  return (
    <div className="user-container">
      <h2>Lista (m)učenika</h2>
      <input
        type="text"
        value={studentName}
        onChange={(e) => setStudentName(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Dodaj ime"
      />
      <button onClick={addStudent}>Dodaj (m)učenika</button>
      <ul className="students-list">
        {students.map((student, index) => (
          <li key={index}>
            {student.number}. {student.name} 
            <button onClick={() => removeStudent(student.name)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

User.propTypes = {
  students: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired,
  })).isRequired,
  setStudents: PropTypes.func.isRequired,
};

export default User;
