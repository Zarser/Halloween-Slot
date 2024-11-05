import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SlotMachine from './components/SlotMachine'; // Keep only the SlotMachine component
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="App" align="center">
        <h1>Halloween Slot</h1>
        <Routes>
          <Route path="/slot-machine" element={<SlotMachine />} />
          <Route path="/" element={<SlotMachine />} /> {/* Redirect to SlotMachine */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
