/** Industries router for BizTime */


const express = require('express');
const router = express.Router();
const db = require('../db');
const ExpressError = require('../expressError');
const slugify = require('slugify');


/** Return list of industries */

router.get('/', async (req, res, next) => {
  try {
    const result = await db.query(
      `SELECT i.code, i.industry, ic.comp_code
      FROM industries AS i
      INNER JOIN industries_companies AS ic
      ON (i.code = ic.ind_code)`
    );
    const industries = result.rows.reduce((acc, { code, industry, comp_code }) => {
      const foundIndustry = acc.find(i => i.code === code);
      if (foundIndustry) {
        foundIndustry.comp_codes.push(comp_code);
      } else {
        acc.push({ code, industry, comp_codes: [comp_code] });
      }
      return acc;
    }, []);
    return res.json({ industries: industries });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
