const { gql } = require('apollo-server');

const typeDefs = gql`
  # schema goes here
  # exapmle schema
  type Query {
    me: User
    users: [User!]
  }

  type User {
    name: String!
    email: String!
    password: String!
  }
`;

module.exports = typeDefs;
