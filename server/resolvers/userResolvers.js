const { AuthenticationError } = require('apollo-server');

module.exports = {
  Query: {
    user: async (parent, { email, password }, { dataSources }) => {
      try {
        const {postgresDB} = dataSources;
        const text = `SELECT * FROM users WHERE email=$1 AND password=$2`;
        const params = [email, password];
        const user = await postgresDB(text, params);
        if (!user.rows[0]) throw new AuthenticationError();
        return user.rows[0];
      } catch (err) {
        console.log('An error occurred in user resolver: ', err);
        if (err.extensions && err.extensions.code === 'UNAUTHENTICATED') {
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
    boards: async (parent, args, { dataSources }) => {
      try {
        const {postgresDB} = dataSources;
        const usersId = parent._id;
        const text = 'SELECT * FROM boards WHERE users_id=$1';
        const params = [usersId];
        const boards = await postgresDB(text, params);
        return boards.rows;
      } catch (err) {
        console.log('An error occurred in User.boards resolver: ', err);
        return err;
      }
    },
  },

  Mutation: {
    createUser: async (parent, { name, email, password }, { dataSources }) => {
      try {
        const {postgresDB} = dataSources;
        const text = `
        INSERT INTO 
        users (name, email, password) 
        VALUES ($1, $2, $3) 
        RETURNING *
      `;
        const params = [name, email, password];
        const newUser = await postgresDB(text, params);
        return newUser.rows[0];
      } catch (err) {
        console.log('An error occurred in createUser resolver: ', err);
        return err;
      }
    },

    deleteUser: async (parent, { email }, { dataSources }) => {
      try {
        const {postgresDB} = dataSources;
        const text = `
        DELETE FROM 
        users 
        WHERE email=$1 
        RETURNING *
      `;
        const params = [email];
        const deletedUser = await postgresDB(text, params);
        return deletedUser.rows[0];
      } catch (err) {
        console.log('An error occurred in deleteUser resolver: ', err);
        return err;
      }
    },
  },
};
