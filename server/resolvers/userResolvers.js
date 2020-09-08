const { AuthenticationError } = require('apollo-server');

module.exports = {
  Query: {
    user: async (parent, { email, password }, { postgresDB }) => {
      try {
        const text = `SELECT * FROM users WHERE email=$1 AND password=$2`;
        const params = [email, password];
        const user = await postgresDB.query(text, params);
        if (!user.rows[0]) throw new AuthenticationError();
        return user.rows[0];
      } catch (err) {
        console.log('An error occurred in user resolver: ', err);
        if (err.extensions.code === 'UNAUTHENTICATED') {
          err.extensions.message =
            'User is not authenticated. Please log in or create an account.';
          return err.extensions;
        }
        return err;
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
      try {
        const usersId = parent._id;
        const text = 'SELECT * FROM boards WHERE users_id=$1';
        const params = [usersId];
        const boards = await postgresDB.query(text, params);
        return boards.rows;
      } catch (err) {
        console.log('An error occurred in User.boards resolver: ', err);
        return err;
      }
    },
  },

  Mutation: {
    createUser: async (parent, { name, email, password }, { postgresDB }) => {
      try {
        const text = `
        INSERT INTO 
        users (name, email, password) 
        VALUES ($1, $2, $3) 
        RETURNING *
      `;
        const params = [name, email, password];
        const newUser = await postgresDB.query(text, params);
        return newUser.rows[0];
      } catch (err) {
        console.log('An error occurred in createUser resolver: ', err);
        return err;
      }
    },

    deleteUser: async (parent, { email }, { postgresDB }) => {
      try {
        const text = `
        DELETE FROM 
        users 
        WHERE email=$1 
        RETURNING *
      `;
        const params = [email];
        const deletedUser = await postgresDB.query(text, params);
        return deletedUser.rows[0];
      } catch (err) {
        console.log('An error occurred in deleteUser resolver: ', err);
        return err;
      }
    },
  },
};
