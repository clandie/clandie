const { gql } = require("apollo-server");

const typeDefs = gql`
  # schema goes here
  # exapmle schema
  type Query {
    me: User
  }

  type User {
    username: String!
  }
`;

module.exports = typeDefs;
