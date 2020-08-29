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
      // TODO: Add error handling for bad user input
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

      // generate query text for PostgresQL based on user input
      let finalText = ``;
      const generateQueryText = () => {
        const text = `UPDATE jobs SET `;
        const arrayOfArgs = Object.keys(args);
        let i = 0;
        for (i; i < arrayOfArgs.length - 1; i++) {
          /* If the user wanted to update a field, add to text string. If they did not
          want to update a certain field we recieve an empty string, so we remove this 
          argument from our list of args, decrementing i to account for the missing arg. */
          if (args[arrayOfArgs[i]] !== '') {
            text += `${arrayOfArgs[i]}=$${i + 1}`;
            text += `, `;
          } else arrayOfArgs.splice(i--, 1);
        }
        // account for extra comma at end of argument list
        text[text.length - 2] === ','
          ? (finalText = text.slice(0, text.length - 2))
          : (finalText = text);
        finalText += ` WHERE _id=$${i + 1} RETURNING *`;
      };
      generateQueryText();

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
      const params = [];
      for (let i = 0; i < paramsUnfiltered.length; i++) {
        if (paramsUnfiltered[i] !== '' && paramsUnfiltered[i] !== null) {
          params.push(paramsUnfiltered[i]);
        }
      }

      const updatedJob = await postgresDB.query(finalText, params);
      return updatedJob.rows[0];
    },
  },
};
