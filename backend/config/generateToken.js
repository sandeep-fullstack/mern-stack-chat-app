const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, "SANDEEPPATIDAR", {
    expiresIn: "30d",
  });
};

module.exports = generateToken;
