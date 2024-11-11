require('dotenv').config(); // Load environment variables first

const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const connectDB = require('./config/db');
const resolvers = require('./resolvers/resolvers');
const typeDefs = require('./schema/schema');
const availableSlotRoutes = require('./routes/availableSlotRoutes'); // Import the routes

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  const app = express();

  // Middleware to parse JSON
  app.use(express.json());

  // Connect to MongoDB
  connectDB();

  // Initialize Apollo Server with GraphQL schema and resolvers
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();
  server.applyMiddleware({ app });

  // Define REST API routes
  app.use('/api/available-slots', availableSlotRoutes); // Use the route file for slot routes

  // Start the Express server
  app.listen({ port: PORT }, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
    console.log(`🌐 REST API available at http://localhost:${PORT}/api/available-slots`);
  });
};

startServer();
