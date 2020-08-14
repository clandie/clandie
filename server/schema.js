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
  }
`;

module.exports = typeDefs;
