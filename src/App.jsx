import React, { useState } from 'react';
import './App.css';
import User from './components/User';
import Wheel from './components/Wheel';

function App() {
  const [students, setStudents] = useState([]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Nasumični izbor</h1>
        <div className="main-container">
          <Wheel students={students} />
          <User students={students} setStudents={setStudents} />
        </div>
      </header>
    </div>
  );
}

export default App;
