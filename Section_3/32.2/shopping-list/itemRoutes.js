const express = require('express');
const router = new express.Router();
const ITEMS = require('./fakeDb');

router.get('/', (req, res) => {
  return res.json({ 'items': ITEMS });
});

router.post('/', (req, res) => {
  ITEMS.push({ 'name': req.body.name, 'price': req.body.price });
  const item = ITEMS.find(i => i.name === req.body.name)
  return res.json({ 'added': item });
});

router.get('/:name', (req, res) => {
  const item = ITEMS.find(i => i.name === req.params.name);
  return res.json({ item });
});

router.patch('/:name', (req, res) => {
  const item = ITEMS.find(i => i.name === req.params.name);
  item.name = req.body.name;
  item.price = req.body.price;
  const itemUpdated = ITEMS.find(i => i.name === req.body.name)
  return res.json({ 'updated': itemUpdated });
});

module.exports = router;
