const { BadRequestError } = require("../expressError");

/** Generic helper function for partial updates. Used by `update` methods on
 * models.
 *
 * Takes update data and optional object mapping particular model JS-formatted keys to
 * JSON-formatted keys (camelCased to snake_cased).
 *
 * Returns parameterized SQL string of columns to set and array of values to update to.
 *
 * Throws BadRequestError if no keys found in data.
 *
 * Company example:
 *   ({ name: "New Company Name", numEmployees: 18 },
 *   { numEmployees: "num_employees", logoUrl: "logo_url" }) => 
 *   { setCols: '"name"=$1, "num_employees"=$2', values: ["New Company Name", 18] }
 *
 * User example:
 *   ({ firstName: "Newname", email: "newemail@blabla.com", isAdmin: true },
 *   { firstName: "first_name", lastName: "last_name", isAdmin: "is_admin"}) =>
 *   { setCols: '"first_name"=$1, "email"=$2, "is_admin"=$3',
 *   values: ["Newname", "newemail@blabla.com", true] }
 *
 * Job example:
 *   { title: "Newtitle", salary: 500, equity: 0.01 } =>
 *   { setCols: '"title"=$1, "salary"=$2, "equity"=$3',
 *   values: ["Newtitle", 500, 0.01] }
 */

function sqlForPartialUpdate(dataToUpdate, jsToSql = {}) {
  const keys = Object.keys(dataToUpdate);
  if (keys.length === 0) throw new BadRequestError("No data");

  // {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']
  const cols = keys.map((colName, idx) =>
      `"${jsToSql[colName] || colName}"=$${idx + 1}`,
  );

  return {
    setCols: cols.join(", "),
    values: Object.values(dataToUpdate),
  };
}

/** Helper function for filtering companies in GET /findAll.
 *
 * Takes query parameters from request object.
 *
 * Returns parameterized SQL string of columns and array of values to filter by.
 * Throws BadRequestError if query parameters or values are invalid.
 *
 * { name: "net", minEmployees: 20, maxEmployees: 75 } =>
 * { whereCols: '"name" ILIKE $1 AND "num_employees">=$2 AND "num_employees"<=$3', values: ["%net%", 20, 75] }
 */

function sqlForFilterCompanies(params) {
  const keys = Object.keys(params);

  // Ensure params are valid
  const validParams = ["name", "minEmployees", "maxEmployees"];
  if (!keys.every(key => validParams.includes(key))) {
    throw new BadRequestError(`Invalid parameter. Must be one of: ${validParams.join(", ")}`);
  }

  // If minEmployees AND maxEmployees params are included,
  // ensure maxEmployees is not less than minEmployees
  if (keys.includes("minEmployees") && keys.includes("maxEmployees") && (parseInt(params["minEmployees"]) > parseInt(params["maxEmployees"]))) {
    throw new BadRequestError("minEmployees cannot be greater than maxEmployees");
  }

  // {name: 'net', maxEmployees: 1000} => ['"name" ILIKE $1', '"num_employees"<=$2']
  const cols = [];
  const newParams = { ...params };
  keys.forEach((colName, idx) => {
    if (colName === "name") {
      cols.push(`"name" ILIKE $${idx + 1}`);
      newParams[colName] = `%${params[colName]}%`;
    } else if (colName === "minEmployees") {
      cols.push(`"num_employees">=$${idx + 1}`);
    } else if (colName === "maxEmployees") {
      cols.push(`"num_employees"<=$${idx + 1}`);
    }
  });

  return {
    whereCols: cols.join(" AND "),
    values: Object.values(newParams)
  };
}

/** Helper function for filtering jobs in GET /findAll
 *
 * Takes query parameters from request object.
 *
 * Returns parameterized SQL string of columns and array of values to filter by.
 * Throws BadRequestError if query parameters or values are invalid.
 *
 * { title: "tech", minSalary: 200, hasEquity: true } =>
 * { whereCols: '"title" ILIKE $1 AND "salary">=$2 AND "equity">=$3', values: ["%tech%", 200, 0] }
 */

function sqlForFilterJobs(params) {
  const keys = Object.keys(params);

  // Ensure params are valid
  const validParams = ["title", "minSalary", "hasEquity"];

  if (!keys.every(key => validParams.includes(key))) {
    throw new BadRequestError(`Invalid parameter. Must be one of: ${validParams.join(", ")}`);
  }

  // {title: 'tech', minSalary: 200, hasEquity: true} => ['"title" ILIKE $1', '"salary">=$2', '"equity">$3']
  const cols = [];
  const newParams = { ...params };
  keys.forEach((colName, idx) => {
    if (colName === "title") {
      cols.push(`"title" ILIKE $${idx + 1}`);
      newParams[colName] = `%${params[colName]}%`;
    } else if (colName === "minSalary") {
      cols.push(`"salary">=$${idx + 1}`);
    } else if (colName === "hasEquity") {

      // if `hasEquity` is true, filter jobs with > 0 equity, otherwise disregard
      if (params[colName]) {
        cols.push(`"equity">$${idx + 1}`);
        newParams[colName] = 0;
      } else {
        delete newParams[colName];
      }
    }
  });

  return {
    whereCols: cols.join(" AND "),
    values: Object.values(newParams)
  };
}

module.exports = { sqlForPartialUpdate, sqlForFilterCompanies, sqlForFilterJobs };
