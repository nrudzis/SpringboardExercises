/** Database setup for BizTime. */

const { Client } = require('pg');

const DB_URI = (process.env.NODE_ENV === 'test')
  ? 'postgreql:///biztime_test'
  : 'postgresql:///biztime';

const db = new Client({
  connectionString: DB_URI
});

db.connect();

module.exports = db;
