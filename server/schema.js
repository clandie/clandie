const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    user(email: String!, password: String!): User!
    users: [User!]

    boards(id: ID!): [Board!]
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
  }
`;

module.exports = typeDefs;
