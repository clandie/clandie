module.exports = {
  Query: {
    // get boards through args upon user login
    boards: async (parent, { id }, { postgresDB }) => {
      const usersID = id;
      const text = `SELECT * FROM boards WHERE users_id=$1`;
      const params = [usersID];
      const boards = await postgresDB.query(text, params);
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

  Mutation: {
    createBoard: async (parent, { name, id }, { postgresDB }) => {
      const text = `
        INSERT INTO 
        boards (name, users_id) 
        VALUES ($1, $2) 
        RETURNING *
      `;
      const params = [name, id];
      const newBoard = await postgresDB.query(text, params);
      return newBoard.rows[0];
    },

    deleteBoard: async (parent, { id }, { postgresDB }) => {
      const text = `
        DELETE FROM 
        boards 
        WHERE _id=$1 
        RETURNING *
      `;
      const params = [id];
      const deletedBoard = await postgresDB.query(text, params);
      return deletedBoard.rows[0];
    },
  },
};
