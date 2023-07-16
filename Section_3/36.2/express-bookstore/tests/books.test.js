process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("../app");
const db = require("../db");

beforeEach(async function() {
  await db.query(
    `INSERT INTO books (isbn, amazon_url, author, language, pages, publisher, title, year)
    VALUES ("0691161518", "http://a.co/eobPtX2", "Matthew Lane", "english", 264, "Princeton University Press", Power-Up: Unlocking the Hidden Mathematics in Video Games", 2017)
    RETURNING isbn, amazon_url, author, language, pages, publisher, title, year`
  );
});

afterEach(async function() {
  await db.query("DELETE FROM books");
});

afterAll(async function() {
  await db.end();
});
