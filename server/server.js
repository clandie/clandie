/* CORS is needed to perform HTTP requests from another domain than your s
erver domain to your server. Otherwise you may run into cross-origin resource s
haring errors for your GraphQL server.
*/
const cors = require("cors");
const express = require("express");
const path = require("path");
const { ApolloServer } = require("apollo-server-express");
const app = express();
const PORT = 3000;
require("dotenv").config();

const typeDefs = require("./schema");
const resolvers = require("./resolvers");

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../build/")));

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.applyMiddleware({ app, path: "/graphql" });

// serve html
app.get("/", (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, "../client/index.html"));
});

// catch all
app.use("*", (req, res) => {
  res.status(404).send("Page Not Found");
});

// global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: "Express error handler caught unknown middleware error",
    status: 400,
    message: { err: "error occurred" },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Apollo Server listening on ${PORT}/graphql...`);
});
