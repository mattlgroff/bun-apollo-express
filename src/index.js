import express from "express";
import http from 'http';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { buildSchema } from 'graphql'
import { resolvers } from './resolvers';
import cors from 'cors';
import { json } from 'body-parser';
import * as jose from 'jose'

// Initialize the express app
const app = express();

// Initialize the http server
const httpServer = http.createServer(app);

// Builds schema from a .graphql file
const typeDefs = buildSchema(
  Bun.readFile("./src/schema.graphql")
);

// Initialize Apollo Server
const server = new ApolloServer({
  path: '/graphql',
  enablePlayground: true, // Default is disabled in production
  typeDefs, // Import schema from .graphql file
  resolvers, // Import resolvers from resolvers.js,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

// Start the Apollo Server
await server.start();

// Apply the Apollo Server middleware to the express app
app.use(
  '/graphql',
  cors(),
  json(),
  expressMiddleware(server, {
    context: async ({ req }) => {
      // Auth
      let user;
      if (req.headers.authorization) {
        try {
            const token = req.headers.authorization.split(' ')[1];

            const secret = new TextEncoder().encode(
              process.env.JWT_SECRET,
            );

            const { payload, protectedHeader } = await jose.jwtVerify(token, secret, {
              issuer: 'urn:example:issuer',
              audience: 'urn:example:audience',
            })

            user = payload;
        } catch (err) {
          console.error(err);
        }
      }
        
      // TODO: Implement these
      // Datasources
      const dataSources = {};

      return {
        dataSources,
        user,
      };
    },
  }),
);

// Set the default port to 4000, or use the PORT environment variable
const port = process.env.PORT || 4000;

// Start the http server
await new Promise((resolve) => httpServer.listen({ port }, resolve));
console.log(`🚀 Apollo 🥟 Express Server ready at http://localhost:${port}/graphql`);