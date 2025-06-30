import express from 'express';
import http from 'http';
import cors from 'cors';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { expressMiddleware } from '@as-integrations/express5';
import { ApolloServer } from '@apollo/server';
import { typeDefs } from './src/peopleCarsTypeDefs';
import { resolvers } from './src/peopleCarsResolvers';


const startApolloServer = async ( typeDefs, resolvers ) => {
  // instantiate an express app
  const app = express();

  // create an http server using the express app for development
  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  // start the server
  await server.start();

  app.use(
    '/graphql',
    cors(), // enable CORS for the /graphql endpoint
    express.json(), // JSONify incoming requests
    expressMiddleware(server, {
      context: async ({ req }) => ({ token: req.headers.token })
    }),
  );

  // Client side app will be using port 3000, so we will use port 4000 for the server
  await new Promise(resolve => httpServer.listen({ port: 4000 }, resolve));

  console.log(`🚀 Server is running on http://localhost:4000/graphql`);
}

startApolloServer(typeDefs, resolvers);
