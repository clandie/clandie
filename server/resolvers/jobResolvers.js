const { UserInputError } = require('apollo-server');
const { generateUpdateText, generateUpdateParams } = require('./generateQuery');

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

  JobResult: {
    __resolveType: (job, context, info) => {
      if (job.company) return 'Job';
      if (job.message) return 'BadUserInput';
    },
  },

  Mutation: {
    createJob: async (
      parent,
      { status, company, title, id },
      { postgresDB }
    ) => {
      try {
        if (status === '' || company === '' || title === '')
          throw new UserInputError();
        const text = `
        INSERT INTO 
        jobs (status, company, title, location, salary, url, notes, boards_id) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *
      `;
        const params = [status, company, title, null, null, null, null, id];
        const newJob = await postgresDB.query(text, params);
        return newJob.rows[0];
      } catch (err) {
        if (err.extensions.code === 'BAD_USER_INPUT')
          err.extensions.message =
            'Please enter a company and title in order to add a job.';
        console.log('An error occurred in updateInterview:', err);
        return err.extensions;
      }
    },

    deleteJob: async (parent, { id }, { postgresDB }) => {
      // TODO: think about error handling here - trying to delete a job that doesn't exist? would this every even happen?
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

    updateJob: async (parent, args, { postgresDB }) => {
      try {
        const {
          status,
          company,
          title,
          location,
          salary,
          url,
          notes,
          jobID,
        } = args;

        if (company === '' && title === '') throw new UserInputError();

        const text = generateUpdateText('jobs', args);

        const paramsUnfiltered = [
          status,
          company,
          title,
          location,
          salary === '' ? null : salary,
          url,
          notes,
          jobID,
        ];
        const params = generateUpdateParams(paramsUnfiltered);

        const updatedJob = await postgresDB.query(text, params);
        return updatedJob.rows[0];
      } catch (err) {
        if (err.extensions.code === 'BAD_USER_INPUT')
          err.extensions.message =
            'Please make sure that your job has a company and title.';
        console.log('An error occurred in updateInterview:', err);
        return err.extensions;
      }
    },
  },
};
