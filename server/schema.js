const { gql } = require('apollo-server');
// const GraphQLDateTime = require('graphql-iso-date');

const typeDefs = gql`
  scalar Date

  union UserResult = User | Unauthenticated
  union BoardResult = Board | BadUserInput
  union JobResult = Job | BadUserInput
  union ContactResult = Contact | BadUserInput
  union InterviewResult = Interview | BadUserInput

  type Query {
    user(email: String!, password: String!): UserResult!

    boards(userID: ID!): [Board!]

    jobs(boardID: ID!): [Job!]

    contacts(jobID: ID!): [Contact!]

    interviews(jobID: ID!): [Interview!]
  }

  input JobInput {
    _id: ID!
    status: String!
    company: String!
    title: String!
    location: String
    salary: Int
    url: String
    notes: String
    interviews: [InterviewInput]
    list_order: Int!
  }

  input InterviewInput {
    _id: ID!
    title: String!
    date: Date
    time: Date
    notes: String
    jobs_id: ID!
    allInterviews: [InterviewInput!]
  }


  type Mutation {
    createUser(name: String!, email: String!, password: String!): User!
    deleteUser(email: String!): User!
    # updateUser(name: String, email: String, password: String): User!

    createBoard(name: String!, userID: ID!): BoardResult!
    deleteBoard(boardID: ID!): Board!
    updateBoard(name: String, boardID: ID!): BoardResult!

    createJob(
      status: String!
      company: String!
      title: String!
      boardID: ID!
      list_order: Int!
    ): JobResult!
    deleteJob(jobID: ID!): Job!
    updateJob(
      status: String
      company: String
      title: String
      location: String
      salary: String
      url: String
      notes: String
      jobID: ID!
    ): JobResult!
    updateStatus(jobID: ID!, status: String!): Job!
    updateListOrder(jobs: [JobInput]): [Job!]

    createInterview(title: String!, jobsID: ID!): InterviewResult!
    deleteInterview(interviewID: ID!): Interview!
    updateInterview(
      title: String
      date: Date
      time: Date
      notes: String
      interviewID: ID!
    ): InterviewResult!

    createContact(name: String!, jobID: ID!): ContactResult!
    deleteContact(contactID: ID!): Contact!
    updateContact(
      name: String
      title: String
      phone: String
      email: String
      notes: String
      contactID: ID
    ): ContactResult!
  }

  type Unauthenticated {
    message: String
  }

  type BadUserInput {
    message: String
  }

  type User {
    _id: ID!
    name: String!
    email: String!
    password: String!
    boards: [Board!]
  }

  type Board {
    name: String!
    _id: ID!
    users_id: ID!
    jobs: [Job!]
    userBoards: [Board!]
  }

  type Job {
    _id: ID!
    status: String!
    company: String!
    title: String!
    location: String
    salary: Int
    url: String
    notes: String
    boards_id: ID!
    list_order: Int!
    contacts: [Contact!]
    interviews: [Interview!]
    allJobs: [Job!]
  }

  type Contact {
    _id: ID!
    name: String!
    title: String
    phone: String
    email: String
    notes: String
    jobs_id: ID!
    allContacts: [Contact!]
  }

  type Interview {
    _id: ID!
    title: String!
    date: Date
    time: Date
    notes: String
    jobs_id: ID!
    allInterviews: [Interview!]
  }
`;

module.exports = typeDefs;
