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

module.exports = { sqlForPartialUpdate };
