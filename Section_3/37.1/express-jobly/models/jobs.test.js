"use strict";

const db = require("../db.js");
const { BadRequestError, NotFoundError } = require("../expressError");
const Jobs = require("./jobs.js");
const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** create */

describe("create", function () {
  const newJob = {
    title: "new",
    salary: 400,
    equity: 0.1,
    companyHandle: "c1",
  };

  test("works", async function () {
    let job = await Jobs.create(newJob);
    expect(job).toEqual({
      id: expect.any(Number),
      title: "new",
      salary: 400,
      equity: "0.1",
      companyHandle: "c1", 
    });

    const result = await db.query(
          `SELECT id, title, salary, equity, company_handle
           FROM jobs
           WHERE title = 'new'`);
    expect(result.rows).toEqual([
      {
        id: expect.any(Number),
        title: "new",
        salary: 400,
        equity: "0.1",
        company_handle: "c1",
      },
    ]);
  });
});

/************************************** findAll */

describe("findAll", function () {
  test("works: no filter", async function () {
    const queryParams = {};
    let jobs = await Jobs.findAll(queryParams);
    expect(jobs).toEqual([
      {
        id: expect.any(Number),
        title: "j1",
        salary: 100,
        equity: "0.5",
        companyHandle: "c1",
      },
      {
        id: expect.any(Number),
        title: "j2",
        salary: 200,
        equity: "0.4",
        companyHandle: "c2"
      },
      {
        id: expect.any(Number),
        title: "j3",
        salary: 300,
        equity: null,
        companyHandle: "c3"
      },
    ]);
  });

  test("works: filter 1, title", async function () {
    const queryParams = {
      title: "2",
    };
    let jobs = await Jobs.findAll(queryParams);
    expect(jobs).toEqual([
      {
        id: expect.any(Number),
        title: "j2",
        salary: 200,
        equity: "0.4",
        companyHandle: "c2",
      },
    ]);
  });

  test("works: filter 2, minSalary", async function () {
    const queryParams = {
      minSalary: 200
    };
    let jobs = await Jobs.findAll(queryParams);
    expect(jobs).toEqual([
      {
        id: expect.any(Number),
        title: "j2",
        salary: 200,
        equity: "0.4",
        companyHandle: "c2"
      },
      {
        id: expect.any(Number),
        title: "j3",
        salary: 300,
        equity: null,
        companyHandle: "c3"
      },
    ]);
  });

  test("works: filter 3, hasEquity: true", async function () {
    const queryParams = {
      hasEquity: true 
    };
    let jobs = await Jobs.findAll(queryParams);
    expect(jobs).toEqual([
      {
        id: expect.any(Number),
        title: "j1",
        salary: 100,
        equity: "0.5",
        companyHandle: "c1",
      },
      {
        id: expect.any(Number),
        title: "j2",
        salary: 200,
        equity: "0.4",
        companyHandle: "c2"
      },
    ]);
  });

  test("works: filter 4, hasEquity: false - only param", async function () {
    const queryParams = {
      hasEquity: false
    };
    let jobs = await Jobs.findAll(queryParams);
    expect(jobs).toEqual([
      {
        id: expect.any(Number),
        title: "j1",
        salary: 100,
        equity: "0.5",
        companyHandle: "c1",
      },
      {
        id: expect.any(Number),
        title: "j2",
        salary: 200,
        equity: "0.4",
        companyHandle: "c2"
      },
      {
        id: expect.any(Number),
        title: "j3",
        salary: 300,
        equity: null,
        companyHandle: "c3"
      },
    ]);
  });

  test("works: filter 5, hasEquity: false - other params", async function () {
    const queryParams = {
      minSalary: 200,
      hasEquity: false
    };
    let jobs = await Jobs.findAll(queryParams);
    expect(jobs).toEqual([
      {
        id: expect.any(Number),
        title: "j2",
        salary: 200,
        equity: "0.4",
        companyHandle: "c2"
      },
      {
        id: expect.any(Number),
        title: "j3",
        salary: 300,
        equity: null,
        companyHandle: "c3"
      },
    ]);
  });

  test("works: filter 6, not found", async function () {
    const queryParams = {
      minSalary: 1000
    };
    try {
      await Jobs.findAll(queryParams);
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    };
  });
});
