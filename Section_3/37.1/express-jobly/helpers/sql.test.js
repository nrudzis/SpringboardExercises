const { sqlForPartialUpdate, sqlForFilterCompanies, sqlForFilterJobs } = require("./sql");
const { BadRequestError } = require("../expressError");


/************************************** sqlForPartialUpdate
 * initial data and expected results
 */

const errorData = {};
const companyData = {
  name: "Test Company Name",
  numEmployees: 123
};
const userData = {
  firstName: "Testname",
  email: "testemail@abcd.com",
  isAdmin: true
};
const companySqlToJs = {
  numEmployees: "num_employees",
  logoUrl: "logo_url"
};
const userSqlToJs = {
  firstName: "first_name",
  lastName: "last_name",
  isAdmin: "is_admin"
};
const companyCorrectResult = {
  setCols: '"name"=$1, "num_employees"=$2',
  values: ["Test Company Name", 123]
};
const userCorrectResult = {
  setCols: '"first_name"=$1, "email"=$2, "is_admin"=$3',
  values: ["Testname", "testemail@abcd.com", true]
};

/************************************** sqlForPartialUpdate
 * tests
 */

describe("sqlForPartialUpdate", function () {

  test("is a function", function () {
    expect(typeof sqlForPartialUpdate).toEqual("function");
  });

  test("throws BadRequestError if data is empty", function () {
    expect(function () {
      sqlForPartialUpdate(errorData, companySqlToJs);
    }).toThrow(BadRequestError);
  });

  test("outputs expected result with company data", function () {
    const companyResult = sqlForPartialUpdate(companyData, companySqlToJs);
    expect(companyResult).toEqual(companyCorrectResult);
  });

  test("outputs expected result with user data", function () {
    const userResult = sqlForPartialUpdate(userData, userSqlToJs);
    expect(userResult).toEqual(userCorrectResult);
  });
});

/************************************** sqlForFilterCompanies
 * params and expected results
 */

const invalidCParams = {
  invalid: "iminvalid"
};
const badMinMaxVals = {
  minEmployees: 31,
  maxEmployees: 30
};
const validCParams = {
  name: 'net',
  minEmployees: 65,
  maxEmployees: 500
};
const correctCResult = {
  whereCols: '"name" ILIKE $1 AND "num_employees">=$2 AND "num_employees"<=$3',
  values: ["%net%", 65, 500]
};

/************************************** sqlForFilterCompanies
 * tests
 */

describe("sqlForFilterCompanies", function() {

  test("is a function", function () {
    expect(typeof sqlForFilterCompanies).toEqual("function");
  });

  test("throws BadRequestError if params are invalid", function () {
    expect(function () {
      sqlForFilterCompanies(invalidCParams);
    }).toThrow(BadRequestError);
  });

  test("throws BadRequestError if maxEmployees is less than minEmployees", function () {
    expect(function () {
      sqlForFilterCompanies(badMinMaxVals);
    }).toThrow(BadRequestError);
  });

  test("outputs expected result with valid params", function() {
    const result = sqlForFilterCompanies(validCParams);
    expect(result).toEqual(correctCResult);
  });
});

/************************************** sqlForFilterJobs
 * params and expected results
 */

const invalidJParams = {
  invalid: "iminvalid"
};
const validJParamsETrue = {
  title: 'tech',
  minSalary: 200,
  hasEquity: true 
};
const correctJResultETrue = {
  whereCols: '"title" ILIKE $1 AND "salary">=$2 AND "equity">$3',
  values: ["%tech%", 200, 0]
};
const validJParamsEFalse = {
  title: 'tech',
  minSalary: 200,
  hasEquity: false 
};
const correctJResultEFalse = {
  whereCols: '"title" ILIKE $1 AND "salary">=$2',
  values: ["%tech%", 200]
};

/************************************** sqlForFilterJobs
 * tests
 */

describe("sqlForFilterJobs", function() {

  test("is a function", function () {
    expect(typeof sqlForFilterJobs).toEqual("function");
  });

  test("throws BadRequestError if params are invalid", function () {
    expect(function () {
      sqlForFilterJobs(invalidJParams);
    }).toThrow(BadRequestError);
  });

  test("outputs expected result with valid params, hasEquity true", function() {
    const result = sqlForFilterJobs(validJParamsETrue);
    expect(result).toEqual(correctJResultETrue);
  });

  test("outputs expected result with valid params, hasEquity false", function() {
    const result = sqlForFilterJobs(validJParamsEFalse);
    expect(result).toEqual(correctJResultEFalse);
  });
});
