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
