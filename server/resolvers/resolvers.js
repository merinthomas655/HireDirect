const User = require('../models/User');

const resolvers = {
  Query: {
    users: async (_, { search, page = 1, limit = 10 }) => {
      try {
        if (page < 1) {
          throw new Error('Page number must be greater than or equal to 1');
        }
        if (limit < 1) {
          throw new Error('Limit must be greater than or equal to 1');
        }

 
        const query = {};
        if (search) {
          query.$or = [
            { username: { $regex: search, $options: 'i' } },
            { email: { $regex: search, $options: 'i' } }
          ];
        }

        const users = await User.find(query)
          .skip((page - 1) * limit)
          .limit(limit);

        const totalUsers = await User.countDocuments(query);

        return {
          users,
          totalPages: Math.ceil(totalUsers / limit),
          currentPage: page,
          totalUsers, 
        };
      } catch (error) {
        console.error('Error fetching users:', error);
        throw new Error('Error fetching users. Please try again later.');
      }
    },
  },
};

module.exports = resolvers;
