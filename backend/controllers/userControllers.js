const asyncHandler = require("express-async-handler");
const mysql = require("mysql2/promise");
const bcrypt = require("bcryptjs");
const generateToken = require("../config/generateToken");
const { v4: uuidv4 } = require("uuid"); 

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "MyDb",
});

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic, role } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please Enter all the Fields");
  }

  const [userExists] = await pool.execute(
    "SELECT * FROM users WHERE email = ?",
    [email]
  );

  if (userExists.length > 0) {
    res.status(400);
    throw new Error("User already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const deviceId = uuidv4();
  const [result] = await pool.execute(
    "INSERT INTO users (name, email, password, pic, role, deviceId) VALUES (?, ?, ?, ?, ?,?)",
    [name, email, hashedPassword, pic, role,deviceId]
  );

  const [newUser] = await pool.execute("SELECT * FROM users WHERE id = ?", [
    result.insertId,
  ]);

  if (newUser.length > 0) {
    // Set a cookie for the device ID, with a 30-day expiration
    res.cookie('deviceId', deviceId, {
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
      httpOnly: false, // Ensures the cookie is accessible only by the web server
      secure: process.env.NODE_ENV === "production", // Ensures cookies are only sent over HTTPS in production
      sameSite: 'strict', // Prevents CSRF attacks
    });
  }

  if (newUser.length > 0) {
    res.status(201).json({
      _id: newUser[0].id,
      name: newUser[0].name,
      email: newUser[0].email,
      role:  newUser[0].role,
      isAdmin: newUser[0].isAdmin,
      pic: newUser[0].pic,
      token: generateToken(newUser[0].id),
      deviceId:  deviceId
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const [user] = await pool.execute("SELECT * FROM users WHERE email = ?", [
    email,
  ]);

  if (user.length > 0 && (await bcrypt.compare(password, user[0].password))) {

    const deviceId = uuidv4();

    // Set a cookie for the device ID, with a 30-day expiration
    res.cookie('deviceId', deviceId, {
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
      httpOnly: false, // Ensures the cookie is accessible only by the web server
      secure: process.env.NODE_ENV === "production", // Ensures cookies are only sent over HTTPS in production
      sameSite: 'strict', // Prevents CSRF attacks
    });

    // Update the device ID in the database
    await pool.execute("UPDATE users SET deviceId = ? WHERE id = ?", [
      deviceId,
      user[0].id,
    ]);

    
    res.json({
      _id: user[0].id,
      name: user[0].name,
      email: user[0].email,
      isAdmin: user[0].isAdmin,
      pic: user[0].pic,
      token: generateToken(user[0].id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

const getUserData = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  console.log(req.user);
  const [user] = await pool.execute("SELECT * FROM users WHERE id = ?", [
    userId,
  ]);

  if (user.length > 0) {
    res.json({
      _id: user[0].id,
      name: user[0].name,
      email: user[0].email,
      isAdmin: user[0].isAdmin,
      pic: user[0].pic,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const logoutUser = asyncHandler(async (req, res) => {
  // Clear the deviceId cookie
  res.clearCookie('deviceId');

  // Get user ID from the request (make sure the user is authenticated)
  const userId = req.user.id; // Assuming `req.user` is populated by your authentication middleware

  // Update the deviceId to null in the database
  await pool.execute("UPDATE users SET deviceId = NULL WHERE id = ?", [userId]);

  // Send a response indicating successful logout
  res.json({ message: "Logged out successfully" });
});

module.exports = {registerUser, authUser, getUserData,logoutUser };
