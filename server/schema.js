const { gql } = require('apollo-server');

const typeDefs = gql`
  scalar Date

  type Query {
    user(email: String!, password: String!): User!
    users: [User!]

    boards(id: ID!): [Board!]

    jobs(id: ID!): [Job!]

    contacts(id: ID!): [Contact!]

    interviews(id: ID!): [Interview!]
  }

  type Mutation {
    createUser(name: String!, email: String!, password: String!): User!
    deleteUser(email: String!): User!
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
