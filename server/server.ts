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

import userResolvers, { User, UserResult } from './resolvers/userResolvers';
import boardResolvers, { Board, BoardResult } from './resolvers/boardResolvers';
import jobResolvers, { Job, JobResult } from './resolvers/jobResolvers';
import Interview, { InterviewResult } from './resolvers/interviewResolvers';
import Contact, { ContactResult } from './resolvers/contactResolvers';
import db from './models/dbModel';

// app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../build/')));

/* must use async to create Apollo Server and include serving files/catch all/error 
handler so that server gets created beofre the request hits the catch all while
we can connect to the db before instantiation of Apollo Server. This also makes
sure that Node processes environment variables before the server starts running 
so that we can connect to db with user authentication properly */
const startApolloServer = async () => {
  const postgresDB = await db;
  const server = await new ApolloServer({
    typeDefs: schema,
    resolvers: {
      Query: {
        ...userResolvers.Query,
        ...boardResolvers.Query,
        ...jobResolvers.Query,
        ...Interview.Query,
        ...Contact.Query,
      },
      Mutation: {
        ...userResolvers.Mutation,
        ...boardResolvers.Mutation,
        ...jobResolvers.Mutation,
        ...Interview.Mutation,
        ...Contact.Mutation,
      },
      User,
      Board,
      Job,
      UserResult,
      BoardResult,
      JobResult,
      ContactResult,
      InterviewResult,
    },
    engine: {
      reportSchema: true,
    },
    context: { postgresDB },
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

  // global error handler will only catch errors for serving files - all other errors caught by graphql
  app.use(
    (err: Error, req: Request, res: Response, next: NextFunction): Response => {
      const errorObj = {
        log: 'Express error handler caught unknown error',
        status: 400,
        message: { err: 'error occurred' },
      };
      console.log(errorObj.log);
      return res.status(errorObj.status).json(errorObj.message);
    }
  );
};
startApolloServer();

app.listen(PORT, () => {
  console.log(`Apollo Server listening on ${PORT}/graphql...`);
});
