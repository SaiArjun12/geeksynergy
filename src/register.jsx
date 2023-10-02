import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './register.css';

const RegistrationForm = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    email: '',
    phone: '',
    profession: 'fresher',
  });

  const [errors, setErrors] = useState({});
  const navigate=useNavigate();

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (!credentials.username) {
      newErrors.username = 'Username is required';
      valid = false;
    }

    if (!credentials.password) {
      newErrors.password = 'Password is required';
      valid = false;
    }

    if (!credentials.email) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(credentials.email)) {
      newErrors.email = 'Invalid email address';
      valid = false;
    }

    if (!credentials.phone) {
      newErrors.phone = 'Phone number is required';
      valid = false;
    } else if (!/^\d{10}$/.test(credentials.phone)) {
      newErrors.phone = 'Invalid phone number (10 digits required)';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleRegistration = () => {
    
    const isValid = validateForm();

    if (isValid) {
     
      localStorage.setItem('credentials', JSON.stringify(credentials));

     
      console.log('Stored Credentials:', JSON.parse(localStorage.getItem('credentials')));

      navigate('/login');
    }
  };

  return (
    <div className='registration-container'>
      <h2>Registration Page</h2>
      <input
        type="text"
        placeholder="Username"
        name="username"
        value={credentials.username}
        onChange={handleInputChange}
      />
      {errors.username && <p>{errors.username}</p>}
      <input
        type="password"
        placeholder="Password"
        name="password"
        value={credentials.password}
        onChange={handleInputChange}
      />
      {errors.password && <p>{errors.password}</p>}
      <input
        type="email"
        placeholder="Email"
        name="email"
        value={credentials.email}
        onChange={handleInputChange}
      />
      {errors.email && <p>{errors.email}</p>}
      <input
        type="tel"
        placeholder="Phone Number"
        name="phone"
        value={credentials.phone}
        onChange={handleInputChange}
      />
      {errors.phone && <p>{errors.phone}</p>}
      <select name="profession" value={credentials.profession} onChange={handleInputChange}>
        <option value="fresher">Fresher</option>
        <option value="experienced">Experienced</option>
        
      </select>
      <button onClick={handleRegistration}>Register</button>
    </div>
  );
};

export default RegistrationForm;
