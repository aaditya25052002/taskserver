const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require('http');
// const serverless = require("serverless-http");
const app = express();
app.use(cors());
app.use(bodyParser.json());
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "database.sqlite",
});

const User = sequelize.define("User", {
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  address: DataTypes.STRING,
  phone: DataTypes.STRING,
  dob: DataTypes.DATE,
});

app.post("/users", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

sequelize.sync().then(() => {
  console.log("sql initialized successfully!");
});

// function to check if a number is prime
function isPrime(num) {
  for (let i = 2, sqrt = Math.sqrt(num); i <= sqrt; i++)
    if (num % i === 0) return false;
  return num > 1;
}

app.get("/primes/:num", (req, res) => {
  let num = parseInt(req.params.num);
  let primes = [];

  for (let i = 0; i <= num; i++) {
    if (isPrime(i)) {
      primes.push(i);
    }
  }

  res.send(primes);
});

const port = process.env.PORT || 3001;

const hostname = '0.0.0.0';
// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'Text/plain');
//   res.end('Zeet Node');
// })

app.listen(port,hostname, () => {
  console.log(`App listening at http://localhost:${port}`);
});

// module.exports.handler = serverless(app);
