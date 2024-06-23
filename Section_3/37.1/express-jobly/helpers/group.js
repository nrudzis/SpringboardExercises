/** Generic helper function to group and nest data for model methods with a join.
 *
 * Takes
 *  - resRows - the result.rows data returned from sql db query
 *  - primaryKey - unique key to group by
 *  - nestKey - new key name for array of nested values
 *  - keysToNest - array of key names to nest
 *
 * Returns results with grouped and nested data.
 *
 * Nested values array left empty if values === null.
 *
 * If key names to nest are > 1, groups into objects,
 * otherwise pushes values into array
 *
 * User example, single key to nest:
 * ([
 *    { username: "u1", jobId: 1, // ...other properties },
 *    { username: "u1", jobId: 2, // ...other properties },
 *    { username: "u2", jobId: 2, // ...other properties }
 *  ],
 *  "username", "jobs", ["jobId"]) =>
 * [{ username: "u1", jobs: [1, 2], // ...other properties }, 
 *  { username: "u2", jobs: [2]}, //  ...other properties }]
 *
 * Company example, multiple keys to nest:
 * ([
 *    {
 *      handle: "c1",
 *      id: 1,
 *      title: "j1",
 *      salary: 100,
 *      equtity: 0.2,
 *      // ...other properties
 *    },
 *    {
 *      handle: "c1",
 *      id: 2,
 *      title: "j2",
 *      salary: 200,
 *      equtity: 0.1,
 *      // ...other properties
      }
 *  ],
 *  "handle", "jobs", ["id", "title", "salary", "equity"]) =>
 *  [{
 *     handle: "c1",
 *     jobs: [
 *       { id: 1, title: "j1", salary: 100, equity: 0.2 },
 *       { id: 2, title: "j2", salary: 200, equity: 0.1 }
 *     ],
 *     // ...other properties
 *   }]
 **/

function groupAndNest(resRows, primaryKey, nestKey, keysToNest) {
  return Object.values(resRows.reduce((acc, current) => {
    const groupKey = current[primaryKey];

    // initialize a new group if it doesn't exist
    if (!acc[groupKey]) {
      acc[groupKey] = { ...current, [nestKey]: [] };

      // remove data that will be nested
      keysToNest.forEach(key => delete acc[groupKey][key]);
    }

    // don't include null values
    const hasNullValues = keysToNest.some(key => current[key] === null);

    if (!hasNullValues) {

      // if the number of keys to nest is > 1, group into objects
      if (keysToNest.length > 1) {
        acc[groupKey][nestKey].push(keysToNest.reduce((objAcc, key) => {
          objAcc[key] = current[key];
          return objAcc;
        }, {}));

      // otherwise push in single values
      } else {
        acc[groupKey][nestKey].push(current[keysToNest[0]]);
      }
    }
    return acc;
  }, {}));
}

module.exports = { groupAndNest };
