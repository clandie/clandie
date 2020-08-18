const { Pool } = require('pg');
require('dotenv').config();

let user;
let pass;
let pool;
/* use async await in order for Node to process the environment variables before 
the Apollo Server is instantiated and we can pass them to PG_URI */
const getENV = async () => {
  user = await process.env.DB_USER;
  pass = await process.env.DB_PASSWORD;
  const PG_URI = `postgres://${user}:${pass}@drona.db.elephantsql.com:5432/${user}`;

  pool = new Pool({
    connectionString: PG_URI,
  });
};
getENV();

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};
