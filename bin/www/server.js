const express = require('express');
const app = require('../../app');

const { PORT = 3000 } = process.env;

app.listen(PORT, () => {
  console.log(`listening in port ${PORT}`);
});
