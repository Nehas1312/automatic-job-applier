import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';
import { login } from '../../services/api';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const userData = { email, password };

    try {
      const response = await login(userData);
      if (response.success) {
        setSuccess('Login successful!');
        // Store the token in localStorage
        localStorage.setItem('token', response.token);
        // Redirect to the dashboard page after successful login
        navigate('/dashboard');
      } else {
        setError(response.message || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  const handleSignUpClick = () => {
    navigate('/signup'); // Redirect to the sign-up page
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      <button onClick={handleSignUpClick}>Sign Up</button>
    </div>
  );
}

export default Login;
