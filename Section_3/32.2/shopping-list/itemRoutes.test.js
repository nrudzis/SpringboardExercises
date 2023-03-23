process.env.NODE_ENV = 'test';

const req = require('supertest');
const app = require('./app');
const ITEMS = require('./fakeDb');

let chocolate = { name: 'chocolate', price: 6.89 };

beforeEach(() => {
  ITEMS.push(chocolate);
});

afterEach(() => {
  ITEMS.length = 0;
});

describe('GET /items', () => {
  test('should get all items', async () => {
    const res = await req(app).get('/items');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ items: [chocolate] });
  });
});

describe('POST /items', () => {
  test('should add an item to the list', async () => {
    const res = await req(app)
      .post('/items')
      .send({
        name: 'flour',
        price: 10.37
      });
    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual({
      added: { name: 'flour', price: 10.37 }
    });
  });
});





//const express = require('express');
//const ExpressError = require('./expressError');
//const router = new express.Router();
//const middleware = require('./middleware');
//const ITEMS = require('./fakeDb');
//
//router.get('/', (req, res, next) => {
//  try {
//    return res.json({ 'items': ITEMS });
//  } catch (err) {
//    return next(err);
//  }
//});
//
//router.post('/', middleware.validateJSON, (req, res, next) => {
//  try {
//    ITEMS.push({ 'name': req.body.name, 'price': req.body.price });
//    const item = ITEMS.find(i => i.name === req.body.name);
//    return res.json({ 'added': item });
//  } catch (err) {
//    return next(err);
//  }
//});
//
//router.get('/:name', (req, res) => {
//  try {
//    const item = ITEMS.find(i => i.name === req.params.name);
//    if (!item) throw new ExpressError('Unable to find item', 404);
//    return res.json({ item });
//  } catch (err) {
//    return next(err);
//  }
//});
//
//router.patch('/:name', middleware.validateJSON, (req, res) => {
//  try {
//    const item = ITEMS.find(i => i.name === req.params.name);
//    if (!item) throw new ExpressError('Unable to find item to update', 404);
//    item.name = req.body.name;
//    item.price = req.body.price;
//    return res.json({ 'updated': item });
//  } catch (err) {
//    return next(err);
//  }
//});
//
//router.delete('/:name', (req, res) => {
//  try {
//    const itemIndex = ITEMS.findIndex(i => i.name === req.params.name);
//    if (!ITEMS[itemIndex]) throw new ExpressError('Unable to find item to delete', 404);
//    ITEMS.splice(itemIndex, 1);
//    return res.json({ 'message': 'Deleted' });
//  } catch (err) {
//    return next(err);
//  }
//});
//
//module.exports = router;
