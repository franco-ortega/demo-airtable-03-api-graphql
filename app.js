require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res, next) => {
  res.send('Welcome to the Dragons server. Grrrr!!!');
});

module.exports = app;
