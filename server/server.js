const express = require("express");
const path = require("path");
const { ApolloServer, gql } = require("apollo-server");
const app = express();
const PORT = 3000;
require("dotenv").config();

const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
  }
`;

const books = [
  {
    title: "Harry Potter and the Chamber of Secrets",
    author: "J.K. Rowling",
  },
  {
    title: "Jurassic Park",
    author: "Michael Crichton",
  },
];

const resolvers = {
  Query: {
    books: () => books,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  engine: {
    reportSchema: true,
    variant: "current",
  },
});

server.listen().then(({ url }) => console.log(`🚀  Server ready at ${url}`));

// app.use(express.json());
// app.use(express.static(path.join(__dirname, "../build/")));

// // serve html
// app.get("/", (req, res) => {
//   res.status(200).sendFile(path.resolve(__dirname, "../client/index.html"));
// });

// // graphql endpoint
// app.use(
//   "/graphql".graphqlHTTP({
//     // graphql schema
//   })
// );
// // catch all
// app.use("/", (req, res) => {
//   res.status(404).send("Page Not Found");
// });

// // global error handler
// app.use((err, req, res, next) => {
//   const defaultErr = {
//     log: "Express error handler caught unknown middleware error",
//     status: 400,
//     message: { err: "error occurred" },
//   };
//   const errorObj = Object.assign({}, defaultErr, err);
//   console.log(errorObj.log);
//   return res.status(errorObj.status).json(errorObj.message);
// });

// app.listen(PORT, () => {
//   console.log(`Listening to Port ${PORT}...`);
// });
