module.exports = {
  Query: {
    interviews: async (parent, { id }, { postgresDB }) => {
      const jobsID = id;
      const text = `SELECT * FROM interviews WHERE jobs_id=$1`;
      const params = [jobsID];
      const interviews = await postgresDB.query(text, params);
      return interviews.rows;
    },
  },

  Mutation: {
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
  },
};
