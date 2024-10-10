const User = require('../models/User');
const Provider = require('../models/Provider');
const Category = require('../models/Category');
const Review = require('../models/Review');

const resolvers = {
  Query: {
    providers: async (_, { categoryId, location, minRating }) => {
      try {
        const filters = {};

        if (categoryId) {
          filters.category = categoryId; // Adjust based on your schema
        }
        if (location) {
          filters['location.address'] = { $regex: location, $options: 'i' }; // Case-insensitive search
        }
        if (minRating) {
          filters.ratings = { $gte: minRating };
        }

        // Populate user and reviews when fetching providers
        const providers = await Provider.find(filters)
          .populate('user_id') // Ensure user_id is populated
          .populate('reviews'); // Populate reviews if needed

        return providers;
      } catch (error) {
        throw new Error('Failed to fetch providers: ' + error.message);
      }
    },
    provider: async (_, { id }) => {
      try {
        const provider = await Provider.findById(id)
          .populate('services')
          .populate({
            path: 'reviews',
            populate: {
              path: 'user_id',
              model: 'User'
            }
          });

        if (!provider) {
          throw new Error('Provider not found');
        }

        const user = await User.findById(provider.user_id);
        if (!user) {
          throw new Error('User not found');
        }

        return { ...provider._doc, user };
      } catch (error) {
        throw new Error('Error fetching provider: ' + error.message);
      }
    },

    categories: async () => {
      try {
        return await Category.find();
      } catch (error) {
        throw new Error('Failed to fetch categories: ' + error.message);
      }
    },
  },

  Provider: {
    user: async (provider) => { // Change from user_id to user
      try {
        return await User.findById(provider.user_id); // Ensure this matches your model
      } catch (error) {
        throw new Error('Failed to fetch user: ' + error.message);
      }
    },
  },
};

module.exports = resolvers;
