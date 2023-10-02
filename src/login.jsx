import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css'; 

const LoginForm = () => {
  const [loginCredentials, setLoginCredentials] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginCredentials({ ...loginCredentials, [name]: value });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (!loginCredentials.email) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(loginCredentials.email)) {
      newErrors.email = 'Invalid email address';
      valid = false;
    }

    if (!loginCredentials.password) {
      newErrors.password = 'Password is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleLogin = () => {
    const isValid = validateForm();

    if (isValid) {
      const storedCredentials = JSON.parse(localStorage.getItem('credentials'));

      if (
        storedCredentials &&
        storedCredentials.email === loginCredentials.email &&
        storedCredentials.password === loginCredentials.password
      ) {
        navigate('/home');
      } else {
        setErrors({ ...errors, general: 'Invalid email or password. Please try again.' });
      }
    }
  };

  return (
    <div className="login-container">
      <h2>Login Page</h2>
      <input
        type="email"
        placeholder="Email"
        name="email"
        value={loginCredentials.email}
        onChange={handleInputChange}
      />
      {errors.email && <p>{errors.email}</p>}
      <input
        type="password"
        placeholder="Password"
        name="password"
        value={loginCredentials.password}
        onChange={handleInputChange}
      />
      {errors.password && <p>{errors.password}</p>}
      {errors.general && <p>{errors.general}</p>}
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginForm;
