const User = require('../models/User');
const Service = require('../models/Service');
const Provider = require('../models/Provider');
const Category = require('../models/Category');

const resolvers = {
  Query: {
    // Fetch services with filters
    services: async () => {
      try {
        // Fetch services and populate provider and category fields
        const services = await Service.find()
          .populate('provider_id')  // Populate provider details
          .populate('category_id');  // Populate category details



services.forEach(service => {
  console.log(`Service ID: ${service._id}`);
  console.log(`Provider ID: ${service.provider_id}`);
  console.log(`Category ID: ${service.category_id}`);
  console.log(`Provider Data: ${service.provider_id ? JSON.stringify(service.provider_id) : 'null'}`);
  console.log(`Category Data: ${service.category_id ? JSON.stringify(service.category_id) : 'null'}`);
});


        console.log('Fetched Services:', JSON.stringify(services, null, 2)); // Log the fetched services
        return services; // Return all services with populated provider and category details
      } catch (error) {
        console.error('Error fetching services:', error); // Log the error for better debugging
        throw new Error('Error fetching services: ' + error.message);
      }
    },

    // Fetch all categories
    categories: async () => {
      try {
        return await Category.find();
      } catch (error) {
        console.error('Error fetching categories:', error); // Log the error for better debugging
        throw new Error('Error fetching categories: ' + error.message);
      }
    },
  },
};

module.exports = resolvers;
