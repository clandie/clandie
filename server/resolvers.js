module.exports = {
  Query: {
    // example query
    users: async (parent, args, { db }) => {
      const users = await db.query('SELECT * FROM users');
      return users.rows;
    },
  },
};
