"use strict";

const jwt = require("jsonwebtoken");
const { UnauthorizedError } = require("../expressError");
const {
  authenticateJWT,
  ensureAdmin,
  ensureSameUser,
  handleUnauthorized,
} = require("./auth");


const { SECRET_KEY } = require("../config");
const testJwt = jwt.sign({ username: "test", isAdmin: false }, SECRET_KEY);
const badJwt = jwt.sign({ username: "test", isAdmin: false }, "wrong");


describe("authenticateJWT", function () {
  test("works: via header", function () {
    expect.assertions(2);
     //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const req = { headers: { authorization: `Bearer ${testJwt}` } };
    const res = { locals: {} };
    const next = function (err) {
      expect(err).toBeFalsy();
    };
    authenticateJWT(req, res, next);
    expect(res.locals).toEqual({
      user: {
        iat: expect.any(Number),
        username: "test",
        isAdmin: false,
      },
    });
  });

  test("works: no header", function () {
    expect.assertions(2);
    const req = {};
    const res = { locals: {} };
    const next = function (err) {
      expect(err).toBeFalsy();
    };
    authenticateJWT(req, res, next);
    expect(res.locals).toEqual({});
  });

  test("works: invalid token", function () {
    expect.assertions(2);
    const req = { headers: { authorization: `Bearer ${badJwt}` } };
    const res = { locals: {} };
    const next = function (err) {
      expect(err).toBeFalsy();
    };
    authenticateJWT(req, res, next);
    expect(res.locals).toEqual({});
  });
});


describe("ensureAdmin", function () {
  test("works", function () {
    expect.assertions(1);
    const req = {};
    const res = { locals: { user: { username: "test", is_admin: true} } };
    const next = function (err) {
      expect(err).toBeFalsy();
    };
    ensureAdmin(req, res, next);
  });

  test("unauth if not admin", function () {
    expect.assertions(1);
    const req = {};
    const res = { locals: { user: { username: "test", is_admin: false} } };
    const next = function (req) {
      expect(req.isAuthorized).toBeFalsy();
    };
    ensureAdmin(req, res, next);
  });

  test("unauth if no login", function () {
    expect.assertions(1);
    const req = {};
    const res = { locals: {} };
    const next = function (req) {
      expect(req.isAuthorized).toBeFalsy();
    };
    ensureAdmin(req, res, next);
  });
});


describe("ensureSameUser", function () {
  test("works", function () {
    expect.assertions(1);
    const req = { params: { username: "test" } };
    const res = { locals: { user: { username: "test", is_admin: false} } };
    const next = function (err) {
      expect(err).toBeFalsy();
    };
    ensureSameUser(req, res, next);
  });

  test("unauth if not same user", function () {
    expect.assertions(1);
    const req = { params: { username: "wrong" } };
    const res = { locals: { user: { username: "test", is_admin: false} } };
    const next = function (req) {
      expect(req.isAuthorized).toBeFalsy();
    };
    ensureSameUser(req, res, next);
  });

  test("unauth if no login", function () {
    expect.assertions(1);
    const req = {};
    const res = { locals: {} };
    const next = function (req) {
      expect(req.isAuthorized).toBeFalsy();
    };
    ensureSameUser(req, res, next);
  });
});

describe("handleUnauthorized", function () {
  test("works", function () {
    expect.assertions(1);
    const req = { isAuthorized: true };
    const res = {};
    const next = function (err) {
      expect(err).toBeFalsy();
    };
    handleUnauthorized(req, res, next);
  });

  test("throws UnauthorizedError if not authorized", function () {
    expect.assertions(1);
    const req = {};
    const res = {};
    const next = function (err) {
      expect(err instanceof UnauthorizedError).toBeTruthy();
    };
    handleUnauthorized(req, res, next);
  });
});
