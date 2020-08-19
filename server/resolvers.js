module.exports = {
  Query: {
    // gets all users
    users: async (parent, args, { postgresDB }) => {
      const users = await postgresDB.query('SELECT * FROM users');
      return users.rows;
    },
    // gets a single user
    user: async (parent, args, { postgresDB }) => {
      const text = 'SELECT * FROM users WHERE email=$1';
      const params = ['clandie@gmail.com'];
      const user = await postgresDB.query(text, params);
      return user.rows[0];
    },
    // getes boards from specific user
    boards: async (parent, args, { postgresDB }) => {
      const id = args.id;
      const text = 'SELECT * FROM boards WHERE users_id=$1';
      const params = [id];
      const boards = await postgresDB.query(text, params);
      return boards.rows;
    },
  },

  User: {
    boards: async (parent, args, { postgresDB }) => {
      // console.log('user', user);
      // console.log('parent', parent);
      const id = parent._id;
      console.log('id', id);
      const text = 'SELECT * FROM boards WHERE users_id=$1';
      const params = [id];
      const boards = await postgresDB.query(text, params);
      console.log('boards', boards.rows);
      return boards.rows;
    },
  },
};
