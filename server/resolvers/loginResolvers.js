const User = require('../models/Login');
const bcrypt = require('bcrypt');

const resolvers = {
  Mutation: {
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
  },
};

module.exports = resolvers;
