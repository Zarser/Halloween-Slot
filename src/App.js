import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SlotMachine from './components/SlotMachine';
import Login from './components/Login';
import Register from './components/Register'; // Import the Register component
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="App" align="center">
        <h1><p>Halloween Slot</p></h1>
        <Routes>
          <Route path="/slot-machine" element={<SlotMachine />} />
          <Route path="/" element={<Login />} /> {/* Default route to login */}
          <Route path="/register" element={<Register />} /> {/* Route for registration */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
