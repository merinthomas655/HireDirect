
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const { typeDefs, resolvers } = require('./resolversSchemaTypeDefs'); // Here Combined both schema and resolvers


const PORT = process.env.PORT || 5000;
const startServer = async () => {
  const app = express();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();
  server.applyMiddleware({ app });

  connectDB();

  app.listen({ port: PORT }, () =>
    console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`)
  );
};

startServer();