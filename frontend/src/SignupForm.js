import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'; // Install this package if you haven't already
import { useNavigate } from 'react-router-dom'; // Import useNavigate


const SignupForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Generate a device ID (You can use uuid or any other method)
  //  const deviceId = 'your-device-id'; // You might want to use a library like uuid to generate this.

    try {
      const response = await axios.post('http://localhost:5000/api/user', {
        name,
        email,
        password,
         isAdmin: false,
         role:"Admin",
         pic: "https://icon-library.com/images/avatar-icon/avatar-icon-24.jpg",
      });
  console.log(response.data);
      // Assuming the response contains a token and deviceId
      const { token, deviceId } = response.data;

      // Store token in localStorage
      localStorage.setItem('token', token);
      
      // Store deviceId in cookies for 30 days
      Cookies.set('deviceId', deviceId, { expires: 30 });

      // Redirect to the dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error("Error during signup:", error);
      alert("Signup failed. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <br />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <br />
    
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default SignupForm;
