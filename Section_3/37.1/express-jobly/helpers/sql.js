const { BadRequestError } = require("../expressError");

/** Generic helper function for partial updates. Used by `update` methods on
 * models.
 *
 * Takes update data and object mapping particular model JS-formatted keys to
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
 */

function sqlForPartialUpdate(dataToUpdate, jsToSql) {
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

/** TODO: expand docstring
 * helper function
 * checks for invalid query params,
 * if invalid, throws error
 * else returns sql string needed to complete db query
 */

function sqlForFindAll(params) {
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

  // {name: 'net', maxEmployees: 1000} => ['"name"=$1', '"num_employees"<=$2']
  const cols = [];
  const updatedParams = { ...params };
  keys.forEach((colName, idx) => {
    if (colName === "name") {
      cols.push(`"name" ILIKE $${idx + 1}`);
      updatedParams[colName] = `%${params[colName]}%`;
    } else if (colName === "minEmployees") {
      cols.push(`"num_employees">=$${idx + 1}`);
    } else if (colName === "maxEmployees") {
      cols.push(`"num_employees"<=$${idx + 1}`);
    }
  });

  return {
    whereCols: cols.join(" AND "),
    values: Object.values(updatedParams)
  };
}

module.exports = { sqlForPartialUpdate, sqlForFindAll };
