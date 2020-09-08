const { UserInputError } = require('apollo-server');
const { generateUpdateText } = require('./generateQuery');

module.exports = {
  Query: {
    contacts: async (parent, { jobID }, { postgresDB }) => {
      try {
        const text = `SELECT * FROM contacts WHERE jobs_id=$1`;
        const params = [jobID];
        const contacts = await postgresDB.query(text, params);
        return contacts.rows;
      } catch (err) {
        console.log('An error occurred in contacts resolver: ', err);
        return err;
      }
    },
  },

  ContactResult: {
    __resolveType: (contact, context, info) => {
      if (contact.name) return 'Contact';
      if (contact.message) return 'BadUserInput';
    },
  },

  Mutation: {
    createContact: async (parent, { name, jobID }, { postgresDB }) => {
      try {
        if (name === '') throw new UserInputError();
        const text = `
        INSERT INTO
        contacts (name, title, phone, email, notes, jobs_id)
        VALUES( $1, $2, $3, $4, $5, $6)
        RETURNING *
      `;
        const params = [name, null, null, null, null, jobID];
        const newContact = await postgresDB.query(text, params);
        return newContact.rows[0];
      } catch (err) {
        console.log('An error occurred in updateInterview resolver: ', err);
        if (err.extensions.code === 'BAD_USER_INPUT') {
          err.extensions.message = 'Please enter the name of your contact.';
          return err.extensions;
        }
        return err;
      }
    },

    deleteContact: async (parent, { contactID }, { postgresDB }) => {
      try {
        const text = `
          DELETE FROM
          contacts
          WHERE _id=$1
          RETURNING *
        `;
        const params = [contactID];
        const deletedContact = await postgresDB.query(text, params);
        return deletedContact.rows[0];
      } catch (err) {
        console.log('An error occurred in deleteContact reoslver: ', err);
        return err;
      }
    },

    updateContact: async (parent, args, { postgresDB }) => {
      try {
        const { name, title, phone, email, notes, contactID } = args;
        if (name === '') throw new UserInputError();

        const text = generateUpdateText('contacts', args);

        const params = [name, title, phone, email, notes, contactID];

        const updatedContact = await postgresDB.query(text, params);
        return updatedContact.rows[0];
      } catch (err) {
        console.log('An error occurred in updateInterview resolver: ', err);
        if (err.extensions.code === 'BAD_USER_INPUT') {
          err.extensions.message =
            'Please make sure that you entered a name for this contact.';
          return err.extensions;
        }
        return err;
      }
    },
  },
};
