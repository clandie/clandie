const { generateUpdateText, generateUpdateParams } = require('./generateQuery');

module.exports = {
  Query: {
    contacts: async (parent, { id }, { postgresDB }) => {
      const jobsID = id;
      const text = `SELECT * FROM contacts WHERE jobs_id=$1`;
      const params = [jobsID];
      const contacts = await postgresDB.query(text, params);
      return contacts.rows;
    },
  },

  Mutation: {
    createContact: async (parent, { name, jobID }, { postgresDB }) => {
      const text = `
        INSERT INTO
        contacts (name, title, phone, email, notes, jobs_id)
        VALUES( $1, $2, $3, $4, $5, $6)
        RETURNING *
      `;
      const params = [name, null, null, null, null, jobID];
      const newContact = await postgresDB.query(text, params);
      return newContact.rows[0];
    },

    deleteContact: async (parent, { contactID }, { postgresDB }) => {
      const text = `
        DELETE FROM
        contacts
        WHERE _id=$1
        RETURNING *
      `;
      const params = [contactID];
      const deletedContact = await postgresDB.query(text, params);
      return deletedContact.rows[0];
    },

    updateContact: async (parent, args, { postgresDB }) => {
      const { name, title, phone, email, notes, contactID } = args;
      const text = generateUpdateText('contacts', args);

      const params = generateUpdateParams([
        name,
        title,
        phone,
        email,
        notes,
        contactID,
      ]);

      const updatedContact = await postgresDB.query(text, params);
      return updatedContact.rows[0];
    },
  },
};
