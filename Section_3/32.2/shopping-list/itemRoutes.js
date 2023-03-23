const express = require('express');
const ExpressError = require('./expressError');
const router = new express.Router();
const middleware = require('./middleware');
const ITEMS = require('./fakeDb');

router.get('/', (req, res, next) => {
  try {
    return res.json({ 'items': ITEMS });
  } catch (err) {
    return next(err);
  }
});

router.post('/', middleware.validateJSON, (req, res, next) => {
  try {
    ITEMS.push({ 'name': req.body.name, 'price': req.body.price });
    const item = ITEMS.find(i => i.name === req.body.name);
    return res.json({ 'added': item });
  } catch (err) {
    return next(err);
  }
});

router.get('/:name', (req, res) => {
  try {
    const item = ITEMS.find(i => i.name === req.params.name);
    if (!item) throw new ExpressError('Unable to find item', 404);
    return res.json({ item });
  } catch (err) {
    return next(err);
  }
});

router.patch('/:name', middleware.validateJSON, (req, res) => {
  try {
    const item = ITEMS.find(i => i.name === req.params.name);
    if (!item) throw new ExpressError('Unable to find item to update', 404);
    item.name = req.body.name;
    item.price = req.body.price;
    return res.json({ 'updated': item });
  } catch (err) {
    return next(err);
  }
});

router.delete('/:name', (req, res) => {
  try {
    const itemIndex = ITEMS.findIndex(i => i.name === req.params.name);
    if (!ITEMS[itemIndex]) throw new ExpressError('Unable to find item to delete', 404);
    ITEMS.splice(itemIndex, 1);
    return res.json({ 'message': 'Deleted' });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
