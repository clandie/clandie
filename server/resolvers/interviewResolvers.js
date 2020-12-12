const { UserInputError } = require('apollo-server');
let dayjs = require('dayjs');
let utc = require('dayjs/plugin/utc'); // dependent on utc plugin
// let timezone = require('dayjs/plugin/timezone');

dayjs.extend(utc);
// dayjs.extend(timezone);

module.exports = {
  Query: {
    interviews: async (parent, { jobID }, { dataSources }) => {
      try {
        const {postgresDB} = dataSources;
        const text = `SELECT * FROM interviews WHERE jobs_id=$1`;
        const params = [jobID];
        const interviews = await postgresDB(text, params);
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

  Interview: {
    allInterviews: async ({ jobs_id }, args, { dataSources }) => {
      try {
        const {postgresDB} = dataSources;
        const text = `SELECT * FROM interviews WHERE jobs_id=$1`;
        const params = [jobs_id];
        const interviews = await postgresDB(text, params);
        return interviews.rows;
      } catch (err) {
        console.log(
          'An error occurred in Interview.allInterviews resolver: ',
          err
        );
        return err;
      }
    },
  },

  Mutation: {
    createInterview: async (parent, { title, jobsID }, { dataSources }) => {
      try {
        const {postgresDB} = dataSources;
        if (title === '') throw new UserInputError();
        const text = `
        INSERT INTO
        interviews (title, date, time, notes, jobs_id)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
      `;
        const params = [title, null, null, null, jobsID];
        const newInterview = await postgresDB(text, params);
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

    deleteInterview: async (parent, { interviewID }, { dataSources }) => {
      try {
        const {postgresDB} = dataSources;
        const text = `
          DELETE FROM
          interviews
          WHERE _id=$1
          RETURNING *
        `;
        const params = [interviewID];
        const deletedInterview = await postgresDB(text, params);
        return deletedInterview.rows[0];
      } catch (err) {
        console.log('An error occurred in deleteInterview resolver: ', err);
        return err;
      }
    },

    updateInterview: async (
      parent,
      { title, date, time, timezone, notes, interviewID },
      { dataSources }
    ) => {
      try {

        console.log('time from updateInterview resolver: ', dayjs(time).utc().format('HH:mm:ss'))
        const {postgresDB} = dataSources;
        if (title === '') throw new UserInputError();
        
        const text = `
        UPDATE interviews
        SET title=$1, date=$2, time=$3, timezone=$4, notes=$5
        WHERE _id=$6
        RETURNING *
        `;
        
        date = date === '' ? null : date;
        time = time === '' ? null : time;
        const params = [title, date, dayjs(time).utc().format('HH:mm:ss'), timezone, notes, interviewID];

        const updatedInterview = await postgresDB(text, params);
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
