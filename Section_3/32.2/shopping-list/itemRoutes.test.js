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

describe('GET /items/:name', () => {
  test('should get an item from the list', async () => {
    const res = await req(app).get(`/items/${chocolate.name}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ item: chocolate });
  });
  test('should respond with 404 with invalid name to get', async () => {
    const res = await req(app).get('/items/wrong_name');
    expect(res.statusCode).toBe(404);
    expect(res.body).toEqual({
      error: { msg: 'Unable to find item', status: 404 }
    });
  });
});

describe('PATCH /items/:name', () => {
  test('should update an item in the list', async () => {
    const res = await req(app)
      .patch(`/items/${chocolate.name}`)
      .send({
        name: 'white_chocolate',
        price: 9.89
      });
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      updated: { name: 'white_chocolate', price: 9.89 }
    });
  });
  test('should respond with 404 for invalid name to update', async () => {
    const res = await req(app)
      .patch('/items/wrong_name')
      .send({
        name: 'white_chocolate',
        price: 9.89
      });
    expect(res.statusCode).toBe(404);
    expect(res.body).toEqual({
      error: { msg: 'Unable to find item to update', status: 404 }
    });
  })
});

describe('DELETE /items/:name', () => {
  test('should delete an item in the list', async () => {
    const res = await req(app).delete(`/items/${chocolate.name}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: 'Deleted' });
  });
  test('should respond with 404 for invalid name to delete', async () => {
    const res = await req(app).delete('/items/wrong_name');
    expect(res.statusCode).toBe(404);
    expect(res.body).toEqual({
      error: { msg: 'Unable to find item to delete', status: 404 }
    });
  });
});
