const User = require('../models/User');
const Provider = require('../models/Provider');
const Category = require('../models/Category');
const Review = require('../models/Review');
const Service = require('../models/Service');
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

    //This is login Mutation

    login: async (_, { email, password }) => {
      try {
        // Here check if user sends data null or not
        if (!email || email.trim() === "" ||
          !password || password.trim() === "") {
          return {
            user: null,
            message: 'Please add all required fields data',
            success: false,
          };
        }

        // Check here email ID exit or not
        const user = await User.findOne({ email });

        if (!user) {
          return {
            user: null,
            message: "This emill ID does not found",
            success: false,
          };
        }

        //Check user enter password with exit password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
          return {
            user: null,
            message: 'Invalid Password',
            success: false,
          };
        }

        return {
          user: user,
          message: 'Login successfully',
          success: true,
        };
      } catch (error) {
        throw new Error('Internal server error' + error);
      }
    },

    //This is singup mutation

    signup: async (_, { username, email, password, role }) => {
      try {
        // Here check if user sends data null or not
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

        // Check if the email already exists
        const user = await User.findOne({ email });
        if (user) {
          return {
            user: null,
            message: 'This email ID already exists',
            success: false,
          };
        }

        // Here check user role match or not 
        if (!['user', 'provider'].includes(role.toLowerCase())) {
          return {
            user: null,
            message: 'Invalid role provided',
            success: false,
          };
        }

        const password_hash = await bcrypt.hash(password, 10);

        // Create user and save in database
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
