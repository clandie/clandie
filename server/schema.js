const { gql } = require('apollo-server');
// const GraphQLDateTime = require('graphql-iso-date');

const typeDefs = gql`
  scalar Date

  union UserResult = User | Unauthenticated

  union BoardResult = Board | BadUserInput

  type Query {
    user(email: String!, password: String!): UserResult!
    users: [User!]

    boards(id: ID!): [Board!]

    jobs(id: ID!): [Job!]

    contacts(id: ID!): [Contact!]

    interviews(id: ID!): [Interview!]
  }

  type Mutation {
    createUser(name: String!, email: String!, password: String!): User!
    deleteUser(email: String!): User!
    # updateUser(name: String, email: String, password: String): User!

    createBoard(name: String!, id: ID!): BoardResult!
    deleteBoard(id: ID!): Board!
    updateBoard(name: String, boardID: ID!): BoardResult!

    createJob(status: String!, company: String!, title: String!, id: ID!): Job!
    deleteJob(id: ID!): Job!
    # updateJob(): Job!

    createInterview(title: String!, jobsID: ID!): Interview!
    deleteInterview(interviewID: ID!): Interview!
    # updateInterview(): Interview!

    createContact(name: String!, jobID: ID!): Contact!
    deleteContact(contactID: ID!): Contact!
    # updateContact(): Contact!
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
    interviews_id: ID!
    contacts: [Contact!]
    interviews: [Interview!]
  }

  type Contact {
    _id: ID!
    name: String!
    title: String
    phone: String
    email: String
    notes: String
    # connect to job thru jobs_id
    jobs_id: ID!
  }

  type Interview {
    _id: ID!
    title: String!
    date: Date
    time: Date
    notes: String
  }
`;

module.exports = typeDefs;
