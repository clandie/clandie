module.exports = {
  User: {
    boards: async (parent, args, { postgresDB }) => {
      const id = parent._id;
      const text = 'SELECT * FROM boards WHERE users_id=$1';
      const params = [id];
      const boards = await postgresDB.query(text, params);
      return boards.rows;
    },
  },
};
