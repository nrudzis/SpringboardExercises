const { groupAndNest } = require("./group");

/************************************** groupAndNest
 * initial data and expected results
 */

const companyResRows = [
  {
    handle: "c1",
    name: "C1",
    description: "Desc1",
    numEmployees: 1,
    logoUrl: "http://c1.img",
    id: 1,
    title: "j1",
    salary: 100,
    equity: 0.1
  },
  {
    handle: "c1",
    name: "C1",
    description: "Desc1",
    numEmployees: 1,
    logoUrl: "http://c1.img",
    id: 2,
    title: "j2",
    salary: 200,
    equity: 0.2
  }
];
const companyResRowsNull = [
  {
    handle: "c2",
    name: "C2",
    description: "Desc2",
    numEmployees: 2,
    logoUrl: "http://c2.img",
    id: null,
    title: null,
    salary: null,
    equity: null
  }
];
const userResRows = [
  {
    username: "u1",
    firstName: "U1F",
    lastName: "U1L",
    email: "u1@email.com",
    isAdmin: false,
    jobId: 1
  },
  {
    username: "u1",
    firstName: "U1F",
    lastName: "U1L",
    email: "u1@email.com",
    isAdmin: false,
    jobId: 2
  },
  {
    username: "u2",
    firstName: "U2F",
    lastName: "U2L",
    email: "u2@email.com",
    isAdmin: false,
    jobId: 2
  }
];
const userResRowsNull = [
  {
    username: "u3",
    firstName: "U3F",
    lastName: "U3L",
    email: "u3@email.com",
    isAdmin: false,
    jobId: null
  },
  {
    username: "u4",
    firstName: "U4F",
    lastName: "U4L",
    email: "u4@email.com",
    isAdmin: false,
    jobId: null
  }
];
const companyCorrectResult = [
  {
    handle: "c1",
    name: "C1",
    description: "Desc1",
    numEmployees: 1,
    logoUrl: "http://c1.img",
    jobs: [
      {
        id: 1,
        title: "j1",
        salary: 100,
        equity: 0.1
      },
      {
        id: 2,
        title: "j2",
        salary: 200,
        equity: 0.2
      }
    ]
  }
];
const companyCorrectResultNull = [
  {
    handle: "c2",
    name: "C2",
    description: "Desc2",
    numEmployees: 2,
    logoUrl: "http://c2.img",
    jobs: []
  }
];
const userCorrectResult = [
  {
    username: "u1",
    firstName: "U1F",
    lastName: "U1L",
    email: "u1@email.com",
    isAdmin: false,
    jobs: [1, 2]
  },
  {
    username: "u2",
    firstName: "U2F",
    lastName: "U2L",
    email: "u2@email.com",
    isAdmin: false,
    jobs: [2]
  }
];
const userCorrectResultNull = [
  {
    username: "u3",
    firstName: "U3F",
    lastName: "U3L",
    email: "u3@email.com",
    isAdmin: false,
    jobs: []
  },
  {
    username: "u4",
    firstName: "U4F",
    lastName: "U4L",
    email: "u4@email.com",
    isAdmin: false,
    jobs: []
  }
];

/************************************** groupAndNest
 * tests
 */

describe("groupAndNest", function () {

  test("is a function", function () {
    expect(typeof groupAndNest).toEqual("function");
  });

  test("works, company with multiple keys to nest", function () {
    const companyResult = groupAndNest(companyResRows, "handle", "jobs", ["id", "title", "salary", "equity"]);
    expect(companyResult).toEqual(companyCorrectResult);
  });

  test("works, company jobs array empty if null", function () {
    const companyResult = groupAndNest(companyResRowsNull, "handle", "jobs", ["id", "title", "salary", "equity"]);
    expect(companyResult).toEqual(companyCorrectResultNull);
  });

  test("works, user with single key to nest", function () {
    const userResult = groupAndNest(userResRows, "username", "jobs", ["jobId"]);
    expect(userResult).toEqual(userCorrectResult);
  })

  test("works, user jobs array empty if null", function () {
    const userResultNull = groupAndNest(userResRowsNull, "username", "jobs", ["jobId"]);
    expect(userResultNull).toEqual(userCorrectResultNull);
  })
});
