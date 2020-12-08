import * as types from '../constants/types';
import { CREATE_CONTACT, GET_CONTACT, UPDATE_CONTACT } from '../constants/actionTypes';
import { AppThunk } from '../store';

export const getContacts = (jobID: number): AppThunk => async (dispatch) => {
  const query = `query GetContacts($jobID: ID!) {
    contacts(jobID: $jobID) {
      _id
      name
      title
      phone
      email
      notes
      jobs_id
    }
  }`
  fetch('/graphql', {
    method: 'POST',
    body: JSON.stringify({
      query,
      variables: { jobID },
    }),
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
  })
    .then((res) => res.json())
    .then((allContacts) => {
      dispatch({
        type: GET_CONTACT,
        payload: allContacts.data.contacts,
      });
    })
    .catch(err => {
      console.log('error in get contacts action', err)
    })
}


export const createContact = (name: string, jobID: number): AppThunk => async (dispatch) => {
  const query = `mutation CreateContact($name: String!, $jobID: ID!) {
    createContact(name: $name, jobID: $jobID) {
      __typename
      ... on Contact {
        allContacts {
          _id
          name
          title
          phone
          email
          notes
          jobs_id
        }
      }
      ... on BadUserInput {
        message
      }
    }
  }`

  fetch('/graphql', {
    method: 'POST',
    body: JSON.stringify({
      query,
      variables: { name, jobID },
    }),
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
  })
    .then((res) => res.json())
    .then((newContact) => {
      const {allContacts} = newContact.data.createContact;
      dispatch({
        type: CREATE_CONTACT,
        payload: allContacts,
      })
    })
    .catch((err) => {
      console.log('error in create contact action', err)
    })
};

export const updateContact = (contactInfo: types.IContactInfo): AppThunk => async (dispatch) => {
  const { name, title, phone, email, notes, contactID } = contactInfo;
  const query = `mutation UpdateContact($name: String, $title: String, $phone: String, $email: String, $notes: String, $contactID: ID) {
    updateContact(name: $name, title: $title, phone: $phone, email: $email, notes: $notes, contactID: $contactID) {
      __typename
      ... on Contact {
        allContacts {
          _id
          name
          title
          phone
          email
          notes
          jobs_id
        }
      }
      ... on BadUserInput {
        message
      }
    }
  }`

  fetch('/graphql', {
    method: 'POST',
    body: JSON.stringify({
      query,
      variables: { name, title, phone, email, notes, contactID },
    }),
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
  })
    .then((res) => res.json())
    .then((updatedContact) => {
      const { allContacts } = updatedContact.data.updateContact;
      dispatch({
        type: UPDATE_CONTACT,
        payload: allContacts,
      })
    })
    .catch((err) => {
      console.log('error in update contact action', err)
    })
};

export const deleteContact = (contactID: number): AppThunk => async (dispatch) => {
  const query = `mutation DeleteContact($contactID: ID!) {
    deleteContact(contactID: $contactID) {
      allContacts {
        _id
        name
        title
        phone
        email
        notes
        jobs_id
      }
    }
  }`

  fetch('/graphql', {
    method: 'POST',
    body: JSON.stringify({
      query,
      variables: { contactID },
    }),
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
  })
    .then((res) => res.json())
    .then((deletedContact) => {
      const { allContacts } = deletedContact.data.deleteContact;
      dispatch({
        type: GET_CONTACT,
        payload: allContacts
      })
    })
    .catch(err => {
      console.log('error in delete contact action', err)
    })
};


