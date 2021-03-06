const { UserInputError } = require('apollo-server');

module.exports = {
  Query: {
    jobs: async (parent, { boardID }, { dataSources }) => {
      try {
        const {postgresDB} = dataSources;
        const text = `SELECT * FROM jobs WHERE boards_id=$1`;
        const params = [boardID];
        const jobs = await postgresDB(text, params);
        return jobs.rows;
      } catch (err) {
        console.log('An error occurred in jobs resolver: ', err);
        return err;
      }
    },
  },

  Job: {
    contacts: async (parent, args, { dataSources }) => {
      try {
        const {postgresDB} = dataSources;
        const jobId = parent._id;
        const text = 'SELECT * FROM contacts WHERE jobs_id=$1';
        const params = [jobId];
        const contacts = await postgresDB(text, params);
        return contacts.rows;
      } catch (err) {
        console.log('An error occurred in Job.contacts resolver: ', err);
        return err;
      }
    },
    interviews: async (parent, args, { dataSources }) => {
      try {
        const {postgresDB} = dataSources;
        const jobId = parent._id;
        const text = 'SELECT * FROM interviews WHERE jobs_id=$1';
        const params = [jobId];
        const interviews = await postgresDB(text, params);
        return interviews.rows;
      } catch (err) {
        console.log('An error occurred in Job.interviews resolver: ', err);
        return err;
      }
    },
    allJobs: async (parent, args, { dataSources }) => {
      try {
        const {postgresDB} = dataSources;
        const boardId = parent.boards_id;
        const text = 'SELECT * FROM jobs WHERE boards_id=$1';
        const params = [boardId];
        const jobs = await postgresDB(text, params);
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
      { dataSources }
    ) => {
      try {
        const {postgresDB} = dataSources;
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
        const newJob = await postgresDB(text, params);
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

    deleteJob: async (parent, { jobID }, { dataSources }) => {
      try {
        const {postgresDB} = dataSources;
        
        //deleting interviews
        const interviewQueryText = `
          DELETE FROM
          interviews
          WHERE jobs_id=$1
        `;
        const interviewParams = [jobID];
        await postgresDB(interviewQueryText, interviewParams);

        //deleting contacts
        const contactsQueryText =  `
          DELETE FROM
          contacts
          WHERE jobs_id=$1
        `;
        const contactsParams = [jobID];
        await postgresDB(contactsQueryText, contactsParams);

        // deleting job
        const text = `
          DELETE FROM 
          jobs 
          WHERE _id=$1 
          RETURNING *
        `;
        const params = [jobID];
        const deletedJob = await postgresDB(text, params);
        return deletedJob.rows[0];
      } catch (err) {
        console.log('An error occurred in deleteJob resolver: ', err);
        return err;
      }
    },

    updateJob: async (
      parent,
      { status, company, title, location, salary, url, notes, jobID },
      { dataSources }
    ) => {
      try {
        const {postgresDB} = dataSources;
        if (company === '' || title === '') throw new UserInputError();

        const jobIDInt = Number(jobID);
        const salaryStr = salary === '' ? null : salary.toString();
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
          salaryStr,
          url,
          notes,
          jobIDInt,
        ];

        const updatedJob = await postgresDB(text, params);
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

    updateStatus: async (parent, { jobID, status }, { dataSources }) => {
      try {
        const {postgresDB} = dataSources;
        const text = `
        UPDATE jobs
        SET status=$1
        WHERE _id=$2
        RETURNING *
      `;
        const params = [status, jobID];
        const updatedStatus = await postgresDB(text, params);
        return updatedStatus.rows[0];
      } catch (err) {
        console.log('An error occured in updateStatus resolver: ', err);
        return err;
      }
    },
    updateListOrder: async (parent, { jobs }, { dataSources }) => {

      try {
        const {postgresDB} = dataSources;

        let result;
        for (let i = 0; i < jobs.length; i++) {
          const text = `
            UPDATE jobs
            SET list_order=$1
            WHERE _id=$2
            RETURNING *
          `;
          const params = [jobs[i].list_order, jobs[i]._id];
          const updatedListOrder = await postgresDB(text, params);
          console.log('update list order complete', updatedListOrder.rows);
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
