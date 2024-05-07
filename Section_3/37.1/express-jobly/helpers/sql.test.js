const { sqlForPartialUpdate } = require("./sql");
const { BadRequestError } = require("../expressError");

// Initial data and expected results 

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

//Tests

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
