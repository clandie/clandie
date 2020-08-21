module.exports = {
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
};
