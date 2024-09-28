import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import SignupForm from './SignupForm';
import SigninForm from './SigninForm';
import Dashboard from './Dashboard';

function App() {
  return (
    <Router>
      <div style={{ padding: '20px' }}>
        <h1>Welcome</h1>
        <nav>
          <Link to="/">Sign Up</Link>
          <Link to="/signin">Sign In</Link>
          <Link to="/dashboard">Sign In</Link>
        </nav>

        <Routes>
          <Route path="/" element={<SignupForm />} />
          <Route path="/signin" element={<SigninForm />} />
          <Route path="/dashboard" element={<Dashboard /> } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
