const GraphQLDateTime = require('graphql-iso-date');

module.exports = {
  Query: {
    // gets all users
    users: async (parent, args, { postgresDB }) => {
      const users = await postgresDB.query('SELECT * FROM users');
      return users.rows;
    },
    // gets a single user
    user: async (parent, args, { postgresDB }) => {
      try {
        const text = 'SELECT * FROM users WHERE email=$1 AND password=$2';
        const params = [args.email, args.password];
        const user = await postgresDB.query(text, params);
        // may have to change the error handling
        if (user.rows[0] === undefined) throw new Error();
        return user.rows[0];
      } catch (err) {
        console.log('err in user resolver', err);
        return 'user not verified';
      }
    },
  },

  User: {
    boards: async (parent, args, { postgresDB }) => {
      const id = parent._id;
      const text = 'SELECT * FROM boards WHERE users_id=$1';
      const params = [id];
      const boards = await postgresDB.query(text, params);
      console.log('boards', boards.rows);
      return boards.rows;
    },
  },

  Board: {
    jobs: async (parent, args, { postgresDB }) => {
      const boardId = parent._id;
      const text = 'SELECT * FROM jobs WHERE boards_id=$1';
      const params = [boardId];
      const jobs = await postgresDB.query(text, params);
      return jobs.rows;
    },
  },

  Job: {
    contacts: async (parent, args, { postgresDB }) => {
      const jobId = parent._id;
      const text = 'SELECT * FROM contacts WHERE jobs_id=$1';
      const params = [jobId];
      const contacts = await postgresDB.query(text, params);
      return contacts.rows;
    },
    interviews: async (parent, args, { postgresDB }) => {
      const jobId = parent._id;
      const text = 'SELECT * FROM interviews WHERE jobs_id=$1';
      const params = [jobId];
      const interviews = await postgresDB.query(text, params);
      return interviews.rows;
    },
  },

  // Date: {
  //   Date: GraphQLDateTime,
  // },
};
