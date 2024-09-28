import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

// Create a single socket instance to be reused across components
const socket = io('http://localhost:5000'); // Change this to your server URL if needed

const Dashboard = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Emit a connection event when the component mounts
    socket.emit('connected');

    // Listen for incoming messages
    socket.on('receive message', (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    // Clean up on component unmount
    return () => {
      socket.off('receive message'); // Unsubscribe from the event
    };
  }, []); // Only run on mount and unmount

  const handleSendMessage = () => {
    if (message) {
      // Emit the message to the server
      socket.emit('send message', { message });
      setMessages((prevMessages) => [...prevMessages, { message, sender: 'You' }]); // Show the sent message immediately
      setMessage(''); // Clear the input field
    }
  };

  const handleLogout = () => {
    // Clear localStorage and cookies on logout
    localStorage.removeItem('token');
    document.cookie = "deviceId=; expires=Thu, 01 Jan 1970 00:00:00 GMT;"; // Clear the deviceId cookie
    window.location.href = '/'; // Redirect to home or login page
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <button onClick={handleLogout}>Logout</button>

      <div>
        <h3>Messages</h3>
        <div>
          {messages.map((msg, index) => (
            <div key={index}><strong>{msg.sender || 'Someone'}:</strong> {msg.message}</div>
          ))}
        </div>

        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Dashboard;
