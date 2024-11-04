import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function RegisterForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setMessage('Please fill in both email and password fields.');
      return;
    }

    try {
      const response = await axios.get('http://localhost:5000/users', {
        params: {
          email: email,
        },
      });

      if (response.data.length > 0) {
        setMessage('User already exists. Please use a different email.');
        return;
      }

      await axios.post('http://localhost:5000/users', {
        email: email,
        password: password,
      });
      setMessage('Registration successful! Redirecting to login...');
      setTimeout(() => navigate('/'), 2000);
    } catch (error) {
      setMessage('An error occurred during registration.');
      console.error(error);
    }
  };
  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
      {message && <p className="status-message">{message}</p>}
    </div>
  );
}
export default RegisterForm;