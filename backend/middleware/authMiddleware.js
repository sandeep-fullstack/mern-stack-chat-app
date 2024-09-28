const jwt = require("jsonwebtoken");
const mysql = require("mysql2/promise");
const asyncHandler = require("express-async-handler");

// Create a MySQL pool for connection reuse
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'MyDb',
});

// Protect middleware to authenticate user
const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // Decode token id
      const decoded = jwt.verify(token, "SANDEEPPATIDAR");
     
      const cookieDeviceId = req.headers.cookie.split("deviceId=")[1];


      // Fetch user from MySQL
      const [rows] = await pool.execute('SELECT id, role, deviceId FROM users WHERE id = ?', [decoded.id]);


      if (rows.length === 0) {
        res.status(401);
        throw new Error("Not authorized, user not found");
      }

      // Attach user data to request
      req.user = rows[0];

      if (cookieDeviceId && cookieDeviceId !== req.user.deviceId) {
        res.status(403); // Forbidden
        throw new Error("User logged in from another device");
      }


      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

// Admin check middleware
const admin = asyncHandler(async (req, res, next) => {
  // Check if user is authenticated
  if (!req.user) {
    res.status(401);
    return res.json({ message: "Not authorized, no token" });
  }

  // Fetch user role from the database
  const [rows] = await pool.execute('SELECT role FROM users WHERE id = ?', [req.user.id]);

  if (rows.length === 0 || rows[0].role !== 'Admin') {
    res.status(403);
    return res.json({ message: "Not authorized, access denied" });
  }

  next(); // User is admin, proceed to the next middleware
});

module.exports = { protect, admin };
