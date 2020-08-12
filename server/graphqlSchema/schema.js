const graphql = require("graphql");

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

/* --------obejct types on graph -------*/
// user
const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQlString },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  }),
});
// board
// jobs
// interview
// contact

// root queries - where we jump into the graph
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQlString } },
      resolve(parent, args) {
        // code to get data from db/other source
      },
    },
  },
});

// export new schema passing root query
module.exports = new GraphQLSchema({
  query: rootQuery,
});
