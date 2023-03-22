const express = require('express');
const router = new express.Router();
const ITEMS = require('./fakeDb');

router.get('/', (req, res) => {
  return res.json({ 'items': ITEMS });
});

router.post('/', (req, res) => {
  const name = req.body.name;
  const price = req.body.price;
  ITEMS.push({ 'name': name, 'price': price });
  const item = ITEMS.find(i => i.name === name)
  return res.json({ 'added': item });
});

router.get('/:name', (req, res) => {
  const item = ITEMS.find(i => i.name === req.params.name)
  return res.json({ item });
});

module.exports = router;
