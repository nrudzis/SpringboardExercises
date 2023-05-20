/** Companies router for BizTime */


const express = require('express');
const router = express.Router();
const db = require('../db');
const ExpressError = require('../expressError');
const slugify = require('slugify');


/** Return list of companies */

router.get('/', async (req, res, next) => {
  try {
    const result = await db.query(`SELECT * FROM companies`);
    return res.json({ companies: result.rows });
  } catch (err) {
    return next(err);
  }
});

/** Return object of individual company */

router.get('/:code', async (req, res, next) => {
  try {
    const paramCode = req.params.code;
    const cResult = await db.query(
      `SELECT c.code, c.name, c.description, i.industry
      FROM companies AS c
      LEFT JOIN industries_companies AS ic
      ON c.code = ic.comp_code
      LEFT JOIN industries AS i
      ON ic.ind_code = i.code
      WHERE c.code = $1`,
      [paramCode]
    );
    if (!cResult.rows[0]) {
      throw new ExpressError(`Cannot find company with code ${ paramCode }`, 404);
    }
    const iResult = await db.query(`SELECT id FROM invoices WHERE comp_code=$1`, [paramCode]);
    const { code, name, description } = cResult.rows[0];
    const industries = cResult.rows.map(r => r.industry);
    const invoices = iResult.rows.map(r => r.id);
    return res.json({
      company: {
        code: code,
        name: name,
        description: description,
        industries: industries,
        invoices: invoices
      }
    });
  } catch (err) {
    return next(err);
  }
});

/** Add company */

router.post('/', async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const code = slugify(name);
    const result = await db.query(`INSERT INTO companies (code, name, description) VALUES ($1, $2, $3) RETURNING code, name, description`, [code, name, description]);
    return res.status(201).json({ company: result.rows[0] })
  } catch (err) {
    return next(err);
  }
});

/** Update company */

router.put('/:code', async (req, res, next) => {
  try {
    const { code } = req.params;
    const { name, description } = req.body;
    const result = await db.query(`UPDATE companies SET name=$1, description=$2 WHERE code=$3 RETURNING code, name, description`, [name, description, code]);
    if (!result.rows[0]) {
      throw new ExpressError(`Cannot find company to update with code ${ code }`, 404);
    }
    return res.json({ company: result.rows[0] });
  } catch (err) {
    return next(err);
  }
});

/** Delete company */

router.delete('/:code', async (req, res, next) => {
  try {
    const { code } = req.params;
    const result = await db.query(`DELETE FROM companies WHERE code=$1`, [code]);
    if (result.rowCount === 0) {
      throw new ExpressError(`Cannot find company to delete with code ${ code }`, 404)
    }
    return res.send({ status: 'deleted' });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
