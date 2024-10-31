import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css'; // Make sure to create this CSS file for styles

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = () => {
    if (!username || !password) {
      setError('Please fill out all fields.');
      return;
    }

    // Create user object
    const user = { username, password};

    // Save user info to local storage in JSON format
    localStorage.setItem('user', JSON.stringify(user));

    // Redirect to login page after successful registration
    navigate('/login');
  };

  return (
    <div className="register-container">
      <h2>Register for Slot Game</h2>
      {error && <p className="error-message">{error}</p>}
      <div className="input-group">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="input-field"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-field"
        />
      </div>
      <button onClick={handleRegister} className="register-button">Register</button>
      <p className="footer-text">Already have an account? <a href="/login">Login here</a></p>
    </div>
  );
};

export default Register;
