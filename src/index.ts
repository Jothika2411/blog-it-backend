import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './schemas';
import connectDB from './config/db';
import './config/env';
import { authResolvers } from './resolvers/authResolvers';
import { postResolvers } from './resolvers/postResolvers';

const startServer = async () => {
  connectDB();

  const server = new ApolloServer({
    typeDefs,
    resolvers: [authResolvers, postResolvers],
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req }: { req: Express.Request & { user?: any } }) => {
      return { req, user: req.user };
    },
  });

  console.log(`Server ready at ${url}`);
};

startServer().catch((error) => {
  console.error('Error starting server:', error);
});
