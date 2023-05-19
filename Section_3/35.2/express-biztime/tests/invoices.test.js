process.env.NODE_ENV === 'test';

const request = require('supertest');
const app = require('../app');
const db = require('../db');

let testCompanies;
let testInvoices;

const initializeCompaniesDb = async () => {
  const companies = await db.query(
    `INSERT INTO companies
    VALUES ('apple', 'Apple Computer', 'Maker of OSX'),
           ('ibm', 'IBM', 'Big blue')
    RETURNING code, name, description`
  );
  testCompanies = companies.rows;
}

const initializeInvoicesDb = async () => {
  const invoices = await db.query(
    `INSERT INTO invoices (comp_code, amt, paid, paid_date)
    VALUES ('apple', 100, false, null),
           ('apple', 200, false, null),
           ('apple', 300, true, '2018-01-01'),
           ('ibm', 400, false, null)
    RETURNING id, comp_code, amt, paid, add_date, paid_date`
  );
  testInvoices = invoices.rows;
  testInvoices.forEach(invoice => {
    Object.entries(invoice).forEach(([k, v]) => {
      if (!!v && k === 'paid_date' || k === 'add_date') {
        invoice[k] = v.toISOString();
      }
    });
  });
}

beforeEach(async () => {
  await initializeCompaniesDb();
  await initializeInvoicesDb();
});

afterEach(async () => {
  await db.query('DELETE FROM companies');
  await db.query('DELETE FROM invoices');
});

afterAll(async () => {
  await db.end();
});

describe('GET /invoices', () => {
  test('Gets a list of four invoices', async () => {
    const response = await request(app).get('/invoices');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ invoices: testInvoices });
  });
});

describe('GET /invoices/:id', () => {
  beforeEach(async () => {
    testInvoices.forEach(i => {
      const { code, name, description } = testCompanies.find(c => c.code === i.comp_code);
      i.company = { code, name, description };
      delete i.comp_code;
    });
  });
  test('Gets a single invoice', async () => {
    testInvoice = testInvoices[0];
    const response = await request(app).get(`/invoices/${ testInvoice.id }`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ invoice: testInvoice });
  });
  test('Responds with 404 for invalid id', async () => {
    const response = await request(app).get('/invoices/0');
    expect(response.statusCode).toBe(404);
  });
});
