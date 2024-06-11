"use strict";

const db = require("../db");
const { NotFoundError } = require("../expressError");
const { sqlForFilterJobs } = require("../helpers/sql");

/** Related functions for jobs. */

class Jobs {
  /** Create a job (from data), update db, return new job data.
   *
   * data should be { title, salary, equity, companyHandle }
   *
   * Returns { id, title, salary, equity, companyHandle }
   * */

  static async create({ title, salary, equity, companyHandle }) {
    const result = await db.query(
          `INSERT INTO jobs
           (title, salary, equity, company_handle)
           VALUES ($1, $2, $3, $4)
           RETURNING id, title, salary, equity, company_handle AS "companyHandle"`,
        [
          title,
          salary,
          equity,
          companyHandle,
        ],
    );
    const job = result.rows[0];

    return job;
  }

  /** Find all jobs.
   *
   * Returns [{ id, title, salary, equity, companyHandle }, ...]
   * */

  static async findAll(params) {
    let jobsRes;

    // GET all the jobs
    if (Object.keys(params).length === 0 || (Object.keys(params).length === 1 && params.hasOwnProperty("hasEquity") && params.hasEquity === false)) {
      jobsRes = await db.query(
            `SELECT id,
                    title,
                    salary,
                    equity,
                    company_handle AS "companyHandle"
             FROM jobs
             ORDER BY title`);

    // Or filter jobs using query params
    } else {
      const { whereCols, values } = sqlForFilterJobs(params);
      jobsRes = await db.query(
            `SELECT id,
                    title,
                    salary,
                    equity,
                    company_handle AS "companyHandle"
             FROM jobs
             WHERE ${whereCols}
             ORDER BY title`,
            [...values]);

      if (jobsRes.rows.length < 1) throw new NotFoundError("No jobs found");
    }
    return jobsRes.rows;
  }
}


module.exports = Jobs;
