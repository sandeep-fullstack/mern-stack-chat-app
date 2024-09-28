const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');

// MySQL connection
const pool = mysql.createPool({
  host: 'localhost',
  user: 'your-username',
  password: 'your-password',
  database: 'MyDb',
});

// User model
const createUserTable = async () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      role VARCHAR(255) NOT NULL,
      deviceId VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      pic VARCHAR(255) DEFAULT 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
      isAdmin BOOLEAN DEFAULT false,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `;
  await pool.query(sql);
};

const addUser = async (name, email, password, pic = null, role, deviceId, isAdmin = false) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const sql = `
    INSERT INTO users (name, email, password, pic, role,,deviceId, isAdmin)
    VALUES (?, ?, ?, ?, ?,?)
  `;
  const [result] = await pool.execute(sql, [name, email, hashedPassword, pic,  role, deviceId, isAdmin]);
  return result;
};

const matchPassword = async (enteredPassword, storedPassword) => {
  return await bcrypt.compare(enteredPassword, storedPassword);
};

module.exports = { createUserTable, addUser, matchPassword };
