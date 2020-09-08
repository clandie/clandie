const { UserInputError } = require('apollo-server');
const { generateUpdateText, generateUpdateParams } = require('./generateQuery');

module.exports = {
  Query: {
    boards: async (parent, { userID }, { postgresDB }) => {
      try {
        const text = `SELECT * FROM boards WHERE users_id=$1`;
        const params = [userID];
        const boards = await postgresDB.query(text, params);
        return boards.rows;
      } catch (err) {
        console.log('An error occurred in boards resolver: ', err);
        return err;
      }
    },
  },

  Board: {
    jobs: async (parent, args, { postgresDB }) => {
      try {
        const boardId = parent._id;
        const text = 'SELECT * FROM jobs WHERE boards_id=$1';
        const params = [boardId];
        const jobs = await postgresDB.query(text, params);
        return jobs.rows;
      } catch (err) {
        console.log('An error occurred in jobs resolver: ', err);
        return err;
      }
    },

    userBoards: async (parent, args, { postgresDB }) => {
      try {
        const text = `SELECT * FROM boards WHERE users_id=$1`;
        const params = [parent.users_id];
        const boards = await postgresDB.query(text, params);
        return boards.rows;
      } catch (err) {
        console.log('An error occurred in userBoards resolver: ', err);
        return err;
      }
    },
  },

  BoardResult: {
    __resolveType: (board, context, info) => {
      if (board.name) return 'Board';
      if (board.message) return 'BadUserInput';
    },
  },

  Mutation: {
    createBoard: async (parent, { name, userID }, { postgresDB }) => {
      try {
        if (name === '' || !name) throw new UserInputError();
        // getting all boards from user to ensure no duplicate board names
        // ? is this the best way to handle this error?
        const getText = `SELECT * FROM boards WHERE users_id=$1`;
        const getParams = [userID];
        const allUserBoardsRaw = await postgresDB.query(getText, getParams);
        const allUserBoardsArray = allUserBoardsRaw.rows;
        allUserBoardsArray.forEach((board) => {
          if (board.name === name) throw new UserInputError();
        });
        // entering new board to db
        const text = `
        INSERT INTO 
        boards (name, users_id) 
        VALUES ($1, $2) 
        RETURNING *
      `;
        const params = [name, userID];
        const newBoard = await postgresDB.query(text, params);
        return newBoard.rows[0];
      } catch (err) {
        console.log('An error occurred in createBoard resolver: ', err);
        if (err.extensions && err.extensions.code === 'BAD_USER_INPUT') {
          err.extensions.message =
            'Please enter a name for your board, or make sure that you are not using a duplicate name.';
          return err.extensions;
        }
        return err;
      }
    },

    deleteBoard: async (parent, { boardID }, { postgresDB }) => {
      try {
        const text = `
          DELETE FROM 
          boards 
          WHERE _id=$1 
          RETURNING *
        `;
        const params = [boardID];
        const deletedBoard = await postgresDB.query(text, params);
        return deletedBoard.rows[0];
      } catch (err) {
        console.log('An error occurred in deleteBoard resolver: ', err);
        return err;
      }
    },

    updateBoard: async (parent, args, { postgresDB }) => {
      try {
        if (name === '' || !name) throw new UserInputError();

        const { name, boardID } = args;
        const text = generateUpdateText('boards', args);
        const params = [name, boardID];

        const updatedBoard = await postgresDB.query(text, params);
        return updatedBoard.rows[0];
      } catch (err) {
        console.log('An error occurred in updateBoard: ', err);
        if (err.extensions && err.extensions.code === 'BAD_USER_INPUT') {
          err.extensions.message =
            'Please enter a name for your board, or make sure that you are not using a duplicate name.';
          return err.extensions;
        }
        return err;
      }
    },
  },
};
