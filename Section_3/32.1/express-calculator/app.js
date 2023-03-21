const express = require('express');
const ExpressError = require('./expressError');
const OPERATIONS = require('./calculator');

const app = express();

app.use(express.json());

app.get('/:operation', (req, res, next) => {
  try {
    const operation = req.params.operation;
    if (['mean', 'median', 'mode'].indexOf(operation) < 0) throw new ExpressError('Not Found', 404);
    const { nums } = req.query;
    if (!nums || nums.split(',').length < 2 || !nums.split(',').every(elem => !isNaN(elem))) throw new ExpressError('Bad Request', 400);
    const result = OPERATIONS[`${operation}Calc`](nums);
    return res.json({ 'operation': operation, 'value': result });
  } catch (err) {
    return next(err);
  }
});

app.use((req, res, next) => {
  const notFoundError = new ExpressError('Not Found', 404);
  return next(notFoundError);
});

app.use((err, req, res, next) => {
  let status = err.status || 500;
  let msg = err.msg;
  return res.status(status).json({
    error: {msg, status}
  });
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
