"use strict";

/** Convenience middleware to handle common auth cases in routes. */

const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");
const { UnauthorizedError } = require("../expressError");


/** Middleware: Authenticate user.
 *
 * If a token was provided, verify it, and, if valid, store the token payload
 * on res.locals (this will include the username and isAdmin field.)
 *
 * It's not an error if no token was provided or if the token is not valid.
 */

function authenticateJWT(req, res, next) {
  try {
    const authHeader = req.headers && req.headers.authorization;
    if (authHeader) {
      const token = authHeader.replace(/^[Bb]earer /, "").trim();
      res.locals.user = jwt.verify(token, SECRET_KEY);
    }
    return next();
  } catch (err) {
    return next();
  }
}

/** Middleware to use when they must be an admin.
 *
 * Must always use `handleUnauthorized` middleware after it.
 */

function ensureAdmin(req, res, next) {
  try {
    if (res.locals.user && res.locals.user.isAdmin) {
      req.isAuthorized = true;
    }
    return next();
  } catch (err) {
    return next(err);
  }
}

/** Middleware to use when they must be the same user.
 *
 * Must always use `handleUnauthorized` middleware after it.
 */

function ensureSameUser(req, res, next) {
  try {
    if (res.locals.user && res.locals.user.username === req.params.username) {
      req.isAuthorized = true;
    }
    return next();
  } catch (err) {
    return next(err);
  }
}

/** Middleware to handle unauthorized.
  *
  * Always included after any single or multiple `ensure*` middlewares.
  *
  * router.get('/some-route', [ensureAdmin, ensureSameUser, handleUnauthorized], async function (req, res, next) { ... })
  * router.get('/another-route', [ensureAdmin, handleUnauthorized], async function (req, res, next) { ... })
  */

function handleUnauthorized (req, res, next) {
  try {
    if (!req.isAuthorized) throw new UnauthorizedError();
    return next();
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  authenticateJWT,
  ensureAdmin,
  ensureSameUser,
  handleUnauthorized
};
