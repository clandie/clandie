module.exports = {
  Query: {
    jobs: async (parent, { id }, { postgresDB }) => {
      const boardsID = id;
      const text = `SELECT * FROM jobs WHERE boards_id=$1`;
      const params = [boardsID];
      const jobs = await postgresDB.query(text, params);
      return jobs.rows;
    },
  },

  Job: {
    contacts: async (parent, args, { postgresDB }) => {
      const jobId = parent._id;
      const text = 'SELECT * FROM contacts WHERE jobs_id=$1';
      const params = [jobId];
      const contacts = await postgresDB.query(text, params);
      return contacts.rows;
    },
    interviews: async (parent, args, { postgresDB }) => {
      const jobId = parent._id;
      const text = 'SELECT * FROM interviews WHERE jobs_id=$1';
      const params = [jobId];
      const interviews = await postgresDB.query(text, params);
      return interviews.rows;
    },
  },

  Mutation: {
    createJob: async (
      parent,
      { status, company, title, id },
      { postgresDB }
    ) => {
      const text = `
        INSERT INTO 
        jobs (status, company, title, location, salary, url, notes, boards_id) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *
      `;
      const params = [status, company, title, null, null, null, null, id];
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
  },
};
