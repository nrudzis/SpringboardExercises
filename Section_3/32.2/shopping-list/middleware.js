const ExpressError = require('./expressError');

const validateJSON = (req, res, next) => {
  try {
    const expectedKeys = ['name', 'price'];
    const requiredTypes = {
      name: 'string',
      price: 'number'
    };
    const requiredConstraints = {
      name: /\s/
    };
    const keys = Object.keys(req.body);
    if (!expectedKeys.every(key => keys.includes(key))) throw new ExpressError("Expected key(s) missing: must include 'name' and 'price'.", 400);
    if (!keys.every(key => typeof req.body[key] === requiredTypes[key])) throw new ExpressError("Key(s) mapped to invalid type(s): 'name' must be a string and 'price' must be a number.", 400);
    if (Object.keys(requiredConstraints).every(key => requiredConstraints[key].test(req.body[key]))) throw new ExpressError("Constraint violation: 'name' must not include spaces.", 400);
    return next();
  } catch (err) {
    return next(err);
  }
}

module.exports = { validateJSON };
