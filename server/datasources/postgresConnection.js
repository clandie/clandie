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

/*
CREATE TABLE users (
	_id serial NOT NULL,
	name varchar(255) NOT NULL,
	email varchar(255) NOT NULL,
	password varchar(255) NOT NULL,
	CONSTRAINT users_pk PRIMARY KEY (_id)
) WITH (
  OIDS=FALSE
);

CREATE TABLE boards (
	_id serial NOT NULL,
	name varchar(255) NOT NULL,
	users_id integer NOT NULL,
	CONSTRAINT boards_pk PRIMARY KEY (_id)
) WITH (
  OIDS=FALSE
);

CREATE TABLE jobs (
	_id serial NOT NULL,
	status varchar(255) NOT NULL,
	company varchar(255) NOT NULL,
	title varchar(255) NOT NULL,
	location varchar(255),
	salary integer,
	url varchar(255),
	notes varchar,
	boards_id integer NOT NULL,
	interviews_id integer,
	CONSTRAINT jobs_pk PRIMARY KEY (_id)
) WITH (
  OIDS=FALSE
);

CREATE TABLE contacts (
	_id serial NOT NULL,
	name varchar(255) NOT NULL,
	title varchar(255),
	phone varchar(255),
	email varchar(255),
	notes varchar,
	jobs_id integer NOT NULL,
	CONSTRAINT contacts_pk PRIMARY KEY (_id)
) WITH (
  OIDS=FALSE
);

CREATE TABLE interviews (
	_id serial NOT NULL,
	title varchar(255) NOT NULL,
	date DATE,
	time TIME,
	notes varchar,
	CONSTRAINT interviews_pk PRIMARY KEY (_id)
) WITH (
  OIDS=FALSE
);

ALTER TABLE boards ADD CONSTRAINT boards_fk0 FOREIGN KEY (users_id) REFERENCES users(_id);

ALTER TABLE jobs ADD CONSTRAINT jobs_fk0 FOREIGN KEY (boards_id) REFERENCES boards(_id);
ALTER TABLE jobs ADD CONSTRAINT jobs_fk1 FOREIGN KEY (interviews_id) REFERENCES interviews(_id);

ALTER TABLE contacts ADD CONSTRAINT contacts_fk0 FOREIGN KEY (jobs_id) REFERENCES jobs(_id);
*/
