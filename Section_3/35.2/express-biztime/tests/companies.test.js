process.env.NODE_ENV === 'test';

const request = require('supertest');
const app = require('../app');
const db = require('../db');

let testCompanies;
let testIndustries;
let testIndsComps;
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

const initializeIndustriesDb = async () => {
  const industries = await db.query(
    `INSERT INTO industries
    VALUES ('technology', 'Technology'),
            ('electronics', 'Electronics'),
            ('consumer-electronics', 'Consumer Electronics'),
            ('mainframe-computing', 'Mainframe Computing')
    RETURNING code, industry`
  );
  testIndustries = industries.rows;
}

const initializeIndustriesCompaniesDb = async () => {
  const industriesCompanies = await db.query(
    `INSERT INTO industries_companies
    VALUES ('technology', 'apple'),
           ('technology', 'ibm'),
           ('electronics', 'apple'),
           ('electronics', 'ibm'),
           ('consumer-electronics', 'apple'),
           ('mainframe-computing', 'ibm')
    RETURNING ind_code, comp_code`
  );
  testIndsComps = industriesCompanies.rows;
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
  await db.query('DELETE FROM industries');
  await db.query('DELETE FROM industries_companies');
  await db.query('DELETE FROM invoices');
});

afterAll(async () => {
  await db.end();
});

describe('GET /companies', () => {
  test('Gets a list of two companies', async () => {
    const response = await request(app).get('/companies');
    expect(response.statusCode).toBe(200);
    console.log(testCompanies);
    console.log(response.body);
    expect(response.body).toEqual({ companies: testCompanies });
  });
});

describe('GET /companies/:code', () => {
  beforeEach(async () => {
    await initializeIndustriesDb();
    await initializeIndustriesCompaniesDb();
    await initializeInvoicesDb();
    testIndsComps.forEach(ic => [ ic.industry ] = testIndustries.filter(i => i.code === ic.ind_code).map(i => i.industry));
    console.log(testIndsComps);
    testCompanies.forEach(c => c.industries = testIndsComps.filter(ic => ic.comp_code === c.code).map(ic => ic.industry));
    console.log(testCompanies);
    testCompanies.forEach(c => c.invoices = testInvoices.filter(i => i.comp_code === c.code).map(i => i.id));
    console.log(testCompanies);
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

describe('POST /companies', () => {
  test('Adds a new company', async () => {
    const response = await request(app).post('/companies').send({
      name: 'Nvidia',
      description: 'GPU maker'
    });
    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual({
      company: {
        code: 'Nvidia',
        name: 'Nvidia',
        description: 'GPU maker'
      }
    });
  });
});

describe('PUT /companies/:code', () => {
  test('Edits an existing company', async () => {
    const testCompany = testCompanies[0];
    const response = await request(app).put(`/companies/${ testCompany.code }`).send({
      name: 'Test Name',
      description: 'Test Description'
    });
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      company: {
        code: testCompany.code,
        name: 'Test Name',
        description: 'Test Description'
      }
    });
  });
  test('Responds with 404 for invalid code', async () => {
    const response = await request(app).put('/companies/fakeCode').send({
      name: 'Test Name',
      description: 'Test Description'
    });
    expect(response.statusCode).toBe(404);
  });
});

describe('DELETE /companies/:code', () => {
  test('Deletes a single company', async () => {
    const testCompany = testCompanies[0];
    const response = await request(app).delete(`/companies/${ testCompany.code }`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ status: 'deleted' });
  });
});
