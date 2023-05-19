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

describe('GET /companies/:code', () => {
  beforeEach(async () => {
    await initializeInvoicesDb();
    testCompanies.forEach(c => c.invoices = testInvoices.filter(i => i.comp_code === c.code).map(i => i.id));
  });
  test('Gets a single company', async () => {
    testCompany = testCompanies[0];
    const response = await request(app).get(`/companies/${ testCompany.code }`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ company: testCompany });
  });
  test('Responds with 404 for invalid code', async () => {
    const response = await request(app).get('/companies/fakeCode');
    expect(response.statusCode).toBe(404);
  });
});
