import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';
import bodyParser from 'body-parser';
import { typeDefs } from './schemas';
import connectDB from './config/db';
import './config/env';
import { authResolvers } from './resolvers/authResolvers';
import { postResolvers } from './resolvers/postResolvers';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import http from 'http';
import cors from 'cors';

const startServer = async () => {
  const app = express();
  const httpServer = http.createServer(app);

  connectDB();

  const server = new ApolloServer({
    typeDefs,
    resolvers: [authResolvers, postResolvers],
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  app.use(cors(), bodyParser.json());

  app.use(
    '/graphql',
    expressMiddleware(server, {
      context: async ({ req }: { req: Express.Request & { user?: any } }) => ({ user: req.user }),
    }) as any
  );

  httpServer.listen({ port: 4000 }, () => {
    const address = httpServer.address();
    if (address && typeof address === 'object') {
      const { address: host } = address;
      console.log(`Server ready at https://${host}/graphql`);
    } else {
      console.log('Server ready at http://localhost:4000/graphql');
    }
  });
};

startServer().catch((error) => {
  console.error('Error starting server:', error);
});
