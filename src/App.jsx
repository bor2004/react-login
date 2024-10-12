import React, { useState } from 'react';
import "./App.css";
const App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({}); 

  const storedEmail = 'test@gmail.com';
  const storedPassword = 'password123';

  const validateForm = () => {
    const newErrors = {};
    
    if (!email) {
      newErrors.email = 'Please enter your email';
    }
    
    if (!password) {
      newErrors.password = 'Please enter your password';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formErrors = validateForm();
    
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setMessage('Please fill in the respective fields.');
      return;
    }

    setErrors({});
    
    if (email === storedEmail && password === storedPassword) {
      setMessage('Login successful!');
    } else {
      setMessage('Incorrect email or password.');
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={errors.email ? 'input-error' : ''} 
          />
          {errors.email && <p className="error-message">{errors.email}</p>} 
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={errors.password ? 'input-error' : ''} 
          />
          {errors.password && <p className="error-message">{errors.password}</p>} 
        </div>
        <button type="submit">Login</button>
      </form>
      {message && <p className="status-message">{message}</p>} 
    </div>
  );
};

export default App;
