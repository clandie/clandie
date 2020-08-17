/* CORS is needed to perform HTTP requests from another domain than your s
erver domain to your server. Otherwise you may run into cross-origin resource s
haring errors for your GraphQL server.
*/
import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import { ApolloServer } from 'apollo-server-express';
require('dotenv').config();
// import cors from 'cors';
const PORT = 3000;

const app: express.Application = express();

import schema from './schema';
import resolvers from './resolvers';
import db from './models/dbModel';

// app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../build/')));

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: { db },
});

server.applyMiddleware({ app, path: '/graphql' });

// serve html
// multiple endpoints in array as first arg to get method for serving index.html
app.get(['/', '/home', '/signup'], (req: Request, res: Response) => {
  res.status(200).sendFile(path.resolve(__dirname, '../client/index.html'));
});

// catch all
app.use('*', (req: Request, res: Response) => {
  res.status(404).send('Page Not Found');
});

// global error handler
app.use(
  (err: Error, req: Request, res: Response, next: NextFunction): Response => {
    const defaultErr = {
      log: 'Express error handler caught unknown middleware error',
      status: 400,
      message: { err: 'error occurred' },
    };
    const errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
  }
);

app.listen(PORT, () => {
  console.log(`Apollo Server listening on ${PORT}/graphql...`);
});
