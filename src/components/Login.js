import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Make sure to create this CSS file for styles

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!username || !password) {
      setError('Please enter both username and password.');
      return;
    }

    const credentials = { username, password };
    
    // Save credentials to local storage for demo purposes
    localStorage.setItem('credentials', JSON.stringify(credentials));

    // Redirect to the slot machine
    navigate('/slot-machine');
  };

  return (
    <div className="login-container">
      <h2>Login to Your Slot Game</h2>
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
      <button onClick={handleLogin} className="login-button">Login</button>
      <p className="footer-text">Don't have an account? <a href="/register">Register here</a></p>
    </div>
  );
};

export default Login;
