const { SQLDataSource } = require('datasource-sql');
const postgresConnection = require('./postgresConnection');
// const MINUTE = 60;

class MyDatabase extends SQLDataSource {
  postgresConnection = () => postgresConnection.query;
}

module.exports = MyDatabase;
