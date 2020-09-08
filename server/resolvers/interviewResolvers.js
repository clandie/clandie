const { UserInputError } = require('apollo-server');
const { generateUpdateText, generateUpdateParams } = require('./generateQuery');

module.exports = {
  Query: {
    interviews: async (parent, { jobID }, { postgresDB }) => {
      try {
        const text = `SELECT * FROM interviews WHERE jobs_id=$1`;
        const params = [jobID];
        const interviews = await postgresDB.query(text, params);
        return interviews.rows;
      } catch (err) {
        console.log('An error occurred in interviews resolver: ', err);
        return err;
      }
    },
  },

  InterviewResult: {
    __resolveType: (interview, context, info) => {
      if (interview.title) return 'Interview';
      if (interview.message) return 'BadUserInput';
    },
  },

  Mutation: {
    createInterview: async (parent, { title, jobsID }, { postgresDB }) => {
      try {
        if (title === '') throw new UserInputError();
        const text = `
        INSERT INTO
        interviews (title, date, time, notes, jobs_id)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
      `;
        const params = [title, null, null, null, jobsID];
        const newInterview = await postgresDB.query(text, params);
        return newInterview.rows[0];
      } catch (err) {
        console.log('An error occurred in updateInterview resolver:', err);
        if (err.extensions && err.extensions.code === 'BAD_USER_INPUT') {
          err.extensions.message =
            'Please enter a title to create this interview.';
          return err.extensions;
        }
        return err;
      }
    },

    deleteInterview: async (parent, { interviewID }, { postgresDB }) => {
      try {
        const text = `
          DELETE FROM
          interviews
          WHERE _id=$1
          RETURNING *
        `;
        const params = [interviewID];
        const deletedInterview = await postgresDB.query(text, params);
        return deletedInterview.rows[0];
      } catch (err) {
        console.log('An error occurred in deleteInterview resolver: ', err);
        return err;
      }
    },

    updateInterview: async (parent, args, { postgresDB }) => {
      try {
        const { title, date, time, notes, interviewID } = args;
        if (title === '') throw new UserInputError();

        const text = generateUpdateText('interviews', args);

        date = date === '' ? null : date;
        time = time === '' ? null : time;
        const params = [title, date, time, notes, interviewID];

        const updatedInterview = await postgresDB.query(text, params);
        return updatedInterview.rows[0];
      } catch (err) {
        console.log('An error occurred in updateInterview resolver: ', err);
        if (err.extensions && err.extensions.code === 'BAD_USER_INPUT') {
          err.extensions.message = 'Please add a title for your interview.';
          return err.extensions;
        }
        return err;
      }
    },
  },
};
