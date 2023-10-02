import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegistrationForm from './register';
import LoginForm from './login';
import HomePage from './home';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegistrationForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/home" element={<HomePage/>}/>
      </Routes>
    </Router>
  );
};

export default App;
