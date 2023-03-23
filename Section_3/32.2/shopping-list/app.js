const express = require('express');
const itemRoutes = require('./itemRoutes');
const ExpressError = require('./expressError');

const app = express();

app.use(express.json());
app.use('/items', itemRoutes);

app.use((req, res, next) => {
  const notFoundError = new ExpressError('Not Found', 404)
  return next(notFoundError);
});

app.use((err, req, res, next) => {
  let status = err.status || 500;
  let msg = err.msg;
  return res.status(status).json({
    error: { msg, status }
  });
});

module.exports = app;
