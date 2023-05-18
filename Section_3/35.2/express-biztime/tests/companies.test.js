process.env.NODE_ENV === 'test';

const request = require('supertest');
const app = require('../app');
const db = require('../db');

let testCompanies;
let testInvoices;

beforeEach(async () => {
  const cResult = await db.query(
    `INSERT INTO companies
    VALUES ('apple', 'Apple Computer', 'Maker of OSX'),
           ('ibm', 'IBM', 'Big blue')
    RETURNING code, name, description`
  );
  const iResult = await db.query(
    `INSERT INTO invoices (comp_code, amt, paid, paid_date)
    VALUES ('apple', 100, false, null),
           ('apple', 200, false, null),
           ('apple', 300, true, '2018-01-01'),
           ('ibm', 400, false, null)
    RETURNING id, comp_code, amt, paid, paid_date`
  );
  testCompanies = cResult.rows;
  testInvoices = iResult.rows;
  //testCompanies.forEach(c => c.invoices = testInvoices.filter(i => i.comp_code === c.code).map(i => i.id));
  //testInvoices.forEach(i => {
  //  const { code, name, description } = testCompanies.find(c => c.code === i.comp_code);
  //  i.company = { code, name, description };
  //});
});

afterEach(async () => {
  await db.query('DELETE FROM companies');
  await db.query('DELETE FROM invoices');
});

afterAll(async () => {
  await db.end();
});

describe('GET /companies', () => {
  test('Gets a list of two companies', async () => {
    const response = await request(app).get('/companies');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ companies: testCompanies });
  });
});
