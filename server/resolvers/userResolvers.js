const { AuthenticationError } = require('apollo-server');

module.exports = {
  Query: {
    // gets all users
    users: async (parent, args, { postgresDB }) => {
      const text = `SELECT * FROM users`;
      const users = await postgresDB.query(text);
      return users.rows;
    },
    // gets a single user
    user: async (parent, { email, password }, { postgresDB }) => {
      try {
        const text = `SELECT * FROM users WHERE email=$1 AND password=$2`;
        const params = [email, password];
        const user = await postgresDB.query(text, params);
        // may have to change the error handling
        if (!user.rows[0]) throw new AuthenticationError();
        return user.rows[0];
      } catch (err) {
        err.extensions.message =
          'User is not authenticated. Please log in or create an account.';
        return err.extensions;
      }
    },
  },

  UserResult: {
    __resolveType: (user, context, info) => {
      if (user.name) return 'User';
      if (user.message) return 'Unauthenticated';
    },
  },

  User: {
    boards: async (parent, args, { postgresDB }) => {
      const id = parent._id;
      const text = 'SELECT * FROM boards WHERE users_id=$1';
      const params = [id];
      const boards = await postgresDB.query(text, params);
      return boards.rows;
    },
  },

  Mutation: {
    createUser: async (parent, { name, email, password }, { postgresDB }) => {
      const text = `
        INSERT INTO 
        users (name, email, password) 
        VALUES ($1, $2, $3) 
        RETURNING *
      `;
      const params = [name, email, password];
      const newUser = await postgresDB.query(text, params);
      return newUser.rows[0];
    },

    deleteUser: async (parent, { email }, { postgresDB }) => {
      const text = `
        DELETE FROM 
        users 
        WHERE email=$1 
        RETURNING *
      `;
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
  },
};
