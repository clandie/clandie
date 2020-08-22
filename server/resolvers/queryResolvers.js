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
    // get boards through args upon user login
    boards: async (parent, args, { postgresDB }) => {
      const id = args.id;
      const text = 'SELECT * FROM boards WHERE users_id=$1';
      const params = [id];
      const boards = await postgresDB.query(text, params);
      console.log('boards', boards.rows);
      return boards.rows;
    },

    jobs: async (parent, args, { postgresDB }) => {
      const id = args.id;
      const text = 'SELECT * FROM jobs WHERE boards_id=$1';
      const params = [id];
      const jobs = await postgresDB.query(text, params);
      console.log('jobs', jobs.rows);
      return jobs.rows;
    },
  },
};
