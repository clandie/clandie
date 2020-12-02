// import * as types from '../constants/types';
import { CREATE_CONTACT, GET_CONTACT } from '../constants/actionTypes';
import { AppThunk } from '../store';

export const getContacts = (jobID: number): AppThunk => async (dispatch) => {
  const query = `query GetContacts($jobID: ID!) {
    contacts(jobID: $jobID) {
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
      console.log('All CONTACTS: ', allContacts);
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
      console.log('new contact created', newContact);
      dispatch({
        type: CREATE_CONTACT,
        payload: allContacts,
      })
    })
    .catch((err) => {
      console.log('error in create contact action', err)
    })
};
