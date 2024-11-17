const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const connectDB = require('./config/db');
const resolvers = require('./resolvers/resolvers');
const typeDefs = require('./schema/schema');
const availableSlotRoutes = require('./routes/availableSlotRoutes');
const serviceRoutes = require('./routes/serviceRoutes')

const PORT = process.env.PORT || 8000; // Use 8000 or another safe port

const startServer = async () => {
    const app = express();

    // Custom CORS Middleware
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // Allow React frontend
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Specify allowed HTTP methods
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization'); // Specify allowed headers
      if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }  
      next();
    });

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

    // Available slots API route
  app.use('/api/slots', availableSlotRoutes);
  app.use('/api/services', serviceRoutes);


    // Start the Express server
    app.listen({ port: PORT }, () => {
        console.log(`Server ready at http://localhost:${PORT}`);
    });
};

startServer();
