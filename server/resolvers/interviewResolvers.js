const { UserInputError } = require('apollo-server');
const { generateUpdateText, generateUpdateParams } = require('./generateQuery');

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

    updateInterview: async (parent, args, { postgresDB }) => {
      try {
        // console.log(args);
        // console.log('here');
        const { title, date, time, notes, interviewID } = args;
        if (title === '' && date === '' && time === '' && notes === '') {
          // console.log('in conditional');
          throw new UserInputError();
        }
        const text = generateUpdateText('interviews', args);

        const unfilteredParams = [title, date, time, notes, interviewID];
        const params = generateUpdateParams(unfilteredParams);

        const updatedInterview = await postgresDB.query(text, params);
        return updatedInterview.rows[0];
      } catch (err) {
        if (err.extensions.code === 'BAD_USER_INPUT')
          err.extensions.message =
            'Please enter information that you would like to update.';
        console.log('An error occurred in updateInterview:', err);
      }
    },
  },
};
