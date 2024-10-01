const User = require('../models/User');
const bcrypt = require('bcrypt');

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
