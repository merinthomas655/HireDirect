const User = require('../models/User');


const resolvers = {
  Query: {
    users: async () => {
      try {
        return await User.find();
      } catch (error) {
        throw new Error('Error fetching users');
      }
    },
    
  },

};
module.exports = resolvers;
