const mysql = require("mysql2");

const connectDB = () => {
  const connection = mysql.createConnection({
    host: "localhost",
    user: "root", 
    password: "",
    database: "MyDb"
  });

  connection.connect((error) => {
    if (error) {
      console.error(`Error: ${error}`);
      process.exit(1); // Exit with a non-zero status code to indicate an error
    } else {
      console.log(`MySQL Connected: ${connection.config.host}`);
    }
  });

  return connection;
};

module.exports = connectDB;
