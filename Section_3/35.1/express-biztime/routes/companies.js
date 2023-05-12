/** Companies router for BizTime */


const express = require('express');
const router = express.Router();
const db = require('../db');

/** Get all companies in the db */

router.get('/', async (req, res, next) => {
  try {
    const result = await db.query(`SELECT * FROM companies`);
    return res.json({ companies: result.rows });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
