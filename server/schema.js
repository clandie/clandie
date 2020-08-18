const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    user(email: String!, password: String!): User!
    users: [User!]
    boards: [Board!]
  }

  type User {
    name: String!
    email: String!
    password: String!
  }

  type Board {
    name: String!
    _id: Int!
    users_id: Int!
  }
`;

module.exports = typeDefs;
