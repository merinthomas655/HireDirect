const User = require('../models/User');
const Provider = require('../models/Provider');
const Category = require('../models/Category');
const Review = require('../models/Review');
const Service = require('../models/Service');
const Booking = require('../models/Booking');
const bcrypt = require('bcrypt');

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

    // Resolver to get total counts for the dashboard
    getCounts: async () => {
      try {
        const totalUsers = await User.countDocuments();
        const totalProviders = await Provider.countDocuments();
        const totalServices = await Service.countDocuments();
        const totalBookings = await Booking.countDocuments();

        return {
          totalUsers,
          totalProviders,
          totalServices,
          totalBookings,
        };
      } catch (error) {
        throw new Error("Error fetching counts: " + error.message);
      }
    },

    // Resolver to get booking history
    getBookingHistory: async () => {
      try {
        return await Booking.find()
          .populate({
            path: 'booking_services.service_id',
            select: 'service_name'
          })
          .populate('user_id', 'username')
          .populate('provider_id', 'bio')
          .exec();
      } catch (error) {
        throw new Error("Error fetching booking history: " + error.message);
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

  Mutation: {
    // This is login Mutation
    login: async (_, { email, password }) => {
      try {
        if (!email || email.trim() === "" || !password || password.trim() === "") {
          return {
            user: null,
            message: 'Please add all required fields data',
            success: false,
          };
        }

        const user = await User.findOne({ email });
        if (!user) {
          return {
            user: null,
            message: "This email ID does not exist",
            success: false,
          };
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return {
            user: null,
            message: 'Invalid Password',
            success: false,
          };
        }

        return {
          user,
          message: 'Login successfully',
          success: true,
        };
      } catch (error) {
        throw new Error('Internal server error' + error);
      }
    },

    // This is signup mutation
    signup: async (_, { username, email, password, role }) => {
      try {
        if (!username || username.trim() === "" ||
          !email || email.trim() === "" ||
          !password || password.trim() === "" ||
          !role || role.trim() === "") {
          return {
            user: null,
            message: 'Please add all required fields data',
            success: false,
          };
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return {
            user: null,
            message: 'This email ID already exists',
            success: false,
          };
        }

        if (!['user', 'provider'].includes(role.toLowerCase())) {
          return {
            user: null,
            message: 'Invalid role provided',
            success: false,
          };
        }

        const password_hash = await bcrypt.hash(password, 10);
        const signupUser = new User({ username, email, password: password_hash, role });
        await signupUser.save();

        return {
          user: signupUser,
          message: 'Signup successfully',
          success: true,
        };
      } catch (error) {
        throw new Error('Internal server error' + error);
      }
    },
  },
};

module.exports = resolvers;
