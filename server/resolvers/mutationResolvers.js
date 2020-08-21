module.exports = {
  Mutation: {
    createUser: async (parent, { name, email, password }, { postgresDB }) => {
      const text = `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *`;
      const params = [name, email, password];
      const newUser = await postgresDB.query(text, params);
      return newUser.rows[0];
    },

    deleteUser: async (parent, { email }, { postgresDB }) => {
      const text = 'DELETE FROM users WHERE email=$1 RETURNING *';
      const params = [email];
      const deletedUser = await postgresDB.query(text, params);
      return deletedUser.rows[0];
    },

    // updateUser: async (parent, {name, email, password}, {postgresDB}) => {
    //   const text = '';
    //   const params = [];
    //   const updatedUser = postgresDB.query(text, params);
    //   return updatedUser.rows[0];
    // },

    createBoard: async (parent, { name, _id }, { postgresDB }) => {
      const text =
        'INSERT INTO boards (name, users_id) VALUES ($1, $2) RETURNING *';
      const params = [name, _id];
      const newBoard = await postgresDB.query(text, params);
      return newBoard.rows[0];
    },
  },
};
