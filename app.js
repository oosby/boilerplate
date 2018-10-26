const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());


// Routes

// Healthcheck
app.get('/health', (req, res) => {
  res.status(200).send('healthy');
});

// Error middleware should be last
app.use((req, res) => {
  res.status(404).send("Sorry can't find that.");
});

app.use((err, req, res) => {
  res.status(500).send(err.stack);
});

module.exports = app;