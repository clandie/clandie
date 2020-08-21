module.exports = {
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

    createJob: async (parent, { company, title, id }, { postgresDB }) => {
      const text = `
        INSERT INTO 
        jobs (status, company, title, location, salary, url, notes, boards_id) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *
      `;
      const params = [
        'opportunities',
        company,
        title,
        null,
        null,
        null,
        null,
        id,
      ];
      const newJob = await postgresDB.query(text, params);
      return newJob.rows[0];
    },

    deleteJob: async (parent, { id }, { postgresDB }) => {
      const text = `
        DELETE FROM 
        jobs 
        WHERE _id=$1 
        RETURNING *
      `;
      const params = [id];
      const deletedJob = await postgresDB.query(text, params);
      return deletedJob.rows[0];
    },

    createInterview: async (parent, { title, jobsID }, { postgresDB }) => {
      const text = `
        INSERT INTO
        interviews (title, date, time, notes, jobs_id)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
      `;
      const params = [title, null, null, null, jobsID];
      const newInterview = await postgresDB.query(text, params);
      return newInterview.rows[0];
    },

    deleteInterview: async (parent, { interviewID }, { postgresDB }) => {
      const text = `
        DELETE FROM
        interviews
        WHERE _id=$1
        RETURNING *
      `;
      const params = [interviewID];
      const deletedInterview = await postgresDB.query(text, params);
      return deletedInterview.rows[0];
    },

    createContact: async (parent, { name, jobID }, { postgresDB }) => {
      const text = `
        INSERT INTO
        contacts (name, title, phone, email, notes, jobs_id)
        VALUES( $1, $2, $3, $4, $5, $6)
        RETURNING *
      `;
      const params = [name, null, null, null, null, jobID];
      const newContact = await postgresDB.query(text, params);
      return newContact.rows[0];
    },

    deleteContact: async (parent, { contactID }, { postgresDB }) => {
      const text = `
        DELETE FROM
        contacts
        WHERE _id=$1
        RETURNING *
      `;
      const params = [contactID];
      const deletedContact = await postgresDB.query(text, params);
      return deletedContact.rows[0];
    },
  },
};
