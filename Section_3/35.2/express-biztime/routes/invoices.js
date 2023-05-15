/** Invoices router for BizTime */


const express = require('express');
const router = express.Router();
const db = require('../db');
const ExpressError = require('../expressError');


/** Return info on invoices */

router.get('/', async (req, res, next) => {
  try {
    const result = await db.query(`SELECT * FROM invoices`);
    return res.json({ invoices: result.rows });
  } catch (err) {
    return next(err);
  }
});

/** Return object of individual invoice */

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await db.query(`SELECT i.id, i.comp_code, i.amt, i.paid, i.add_date, i.paid_date, c.name, c.description FROM invoices AS i INNER JOIN companies as c ON (i.comp_code=c.code) WHERE id=$1`, [id]);
    if (!result.rows[0]) {
      throw new ExpressError(`Cannot find invoice with id ${ id }`, 404);
    }
    const data = result.rows[0];
    const invoice = {
      id: data.id,
      amt: data.amt,
      paid: data.paid,
      add_date: data.add_date,
      paid_date: data.paid_date,
      company: {
        code: data.comp_code,
        name: data.name,
        description: data.description
      }
    };
    return res.json({ invoice: invoice });
  } catch (err) {
    return next(err);
  }
});

/** Add invoice */

router.post('/', async (req, res, next) => {
  try {
    const { comp_code, amt } = req.body;
    const result = await db.query(`INSERT INTO invoices (comp_code, amt) VALUES ($1, $2) RETURNING id, comp_code, amt, paid, add_date, paid_date`, [comp_code, amt]);
    return res.status(201).json({ invoice: result.rows[0] })
  } catch (err) {
    return next(err);
  }
});

/** Update invoice */

router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { amt } = req.body;
    const result = await db.query(`UPDATE invoices SET amt=$1 WHERE id=$2 RETURNING id, comp_code, amt, paid, add_date, paid_date`, [amt, id]);
    if (!result.rows[0]) {
      throw new ExpressError(`Cannot find invoice to update with id ${ id }`, 404);
    }
    return res.json({ invoice: result.rows[0] });
  } catch (err) {
    return next(err);
  }
});

/** Delete invoice */

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await db.query(`DELETE FROM invoices WHERE id=$1`, [id]);
    if (result.rowCount === 0) {
      throw new ExpressError(`Cannot find invoice to delete with id ${ id }`, 404)
    }
    return res.send({ status: 'deleted' });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
