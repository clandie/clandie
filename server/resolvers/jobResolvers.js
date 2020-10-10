const { UserInputError } = require('apollo-server');

module.exports = {
  Query: {
    jobs: async (parent, { boardID }, { postgresDB }) => {
      try {
        const text = `SELECT * FROM jobs WHERE boards_id=$1`;
        const params = [boardID];
        const jobs = await postgresDB.query(text, params);
        return jobs.rows;
      } catch (err) {
        console.log('An error occurred in jobs resolver: ', err);
        return err;
      }
    },
  },

  Job: {
    contacts: async (parent, args, { postgresDB }) => {
      try {
        const jobId = parent._id;
        const text = 'SELECT * FROM contacts WHERE jobs_id=$1';
        const params = [jobId];
        const contacts = await postgresDB.query(text, params);
        return contacts.rows;
      } catch (err) {
        console.log('An error occurred in Job.contacts resolver: ', err);
        return err;
      }
    },
    interviews: async (parent, args, { postgresDB }) => {
      // console.log('parent from interviews ', parent);
      try {
        const jobId = parent._id;
        // console.log('jobId: ', jobid);
        const text = 'SELECT * FROM interviews WHERE jobs_id=$1';
        const params = [jobId];
        const interviews = await postgresDB.query(text, params);
        // console.log('interviews data: ', interviews.rows);
        return interviews.rows;
      } catch (err) {
        console.log('An error occurred in Job.interviews resolver: ', err);
        return err;
      }
    },
    allJobs: async (parent, args, { postgresDB }) => {
      try {
        const boardId = parent.boards_id;
        const text = 'SELECT * FROM jobs WHERE boards_id=$1';
        const params = [boardId];
        const jobs = await postgresDB.query(text, params);
        return jobs.rows;
      } catch (err) {
        console.log('An error occurred in Job.allJobs resolver: ', err);
        return err;
      }
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
      { status, company, title, boardID, list_order },
      { postgresDB }
    ) => {
      try {
        if (status === '' || company === '' || title === '')
          throw new UserInputError();
        const text = `
        INSERT INTO 
        jobs (status, company, title, location, salary, url, notes, boards_id, list_order) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING *
      `;
        const params = [
          status,
          company,
          title,
          null,
          null,
          null,
          null,
          boardID,
          list_order,
        ];
        const newJob = await postgresDB.query(text, params);
        return newJob.rows[0];
      } catch (err) {
        console.log('An error occurred in createJob resolver: ', err);
        if (err.extensions && err.extensions.code === 'BAD_USER_INPUT') {
          err.extensions.message =
            'Please enter a company and title in order to add a job.';
          return err.extensions;
        }
        return err;
      }
    },

    deleteJob: async (parent, { jobID }, { postgresDB }) => {
      try {
        const text = `
          DELETE FROM 
          jobs 
          WHERE _id=$1 
          RETURNING *
        `;
        const params = [jobID];
        const deletedJob = await postgresDB.query(text, params);
        return deletedJob.rows[0];
      } catch (err) {
        console.log('An error occurred in deleteJob resolver: ', err);
        return err;
      }
    },

    updateJob: async (
      parent,
      { status, company, title, location, salary, url, notes, jobID },
      { postgresDB }
    ) => {
      try {
        if (company === '' || title === '') throw new UserInputError();

        const jobIDInt = Number(jobID);
        const salaryInt = salary === '' ? null : Number(salary);
        const text = `
          UPDATE jobs
          SET status=$1, company=$2, title=$3, location=$4, salary=$5, url=$6, notes=$7
          WHERE _id=$8
          RETURNING *
        `;

        const params = [
          status,
          company,
          title,
          location,
          salaryInt,
          url,
          notes,
          jobIDInt,
        ];

        const updatedJob = await postgresDB.query(text, params);
        return updatedJob.rows[0];
      } catch (err) {
        console.log('An error occurred in updateJob resolver: ', err);
        if (err.extensions && err.extensions.code === 'BAD_USER_INPUT') {
          err.extensions.message =
            'Please make sure that your job has a company and title.';
          return err.extensions;
        }
        return err;
      }
    },

    updateStatus: async (parent, { jobID, status }, { postgresDB }) => {
      try {
        const text = `
        UPDATE jobs
        SET status=$1
        WHERE _id=$2
        RETURNING *
      `;
        const params = [status, jobID];
        const updatedStatus = await postgresDB.query(text, params);
        console.log('update complete', updatedStatus.rows);
        return updatedStatus.rows[0];
      } catch (err) {
        console.log('An error occured in updateStatus resolver: ', err);
        return err;
      }
    },
    updateListOrder: async (parent, { jobs }, { postgresDB }) => {
      try {
        let result;
        for (let i = 0; i < jobs.length; i++) {
          const text = `
            UPDATE jobs
            SET list_order=$1
            WHERE _id=$2
            RETURNING *
          `;
          const params = [jobs[i].list_order, jobs[i]._id];
          const updatedListOrder = await postgresDB.query(text, params);
          console.log('update complete', updatedListOrder.rows);
          result = updatedListOrder.rows;
        }
        return result;
      } catch (err) {
        console.log('An error occured in updateListOrder resolver: ', err);
        return err;
      }
    },
  },
};
