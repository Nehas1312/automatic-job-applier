import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';
import { signUp } from '../../services/api'; // Adjust the import path as necessary

function SignUp() {
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
      const response = await signUp(userData);
      if (response.success) {
        setSuccess('Sign up successful!');
        // Redirect to the dashboard page after successful sign-up
        navigate('/dashboard');
      } else {
        setError(response.message || 'Sign up failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
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
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;
