const User = require('../models/Singup');
const bcrypt = require('bcrypt');

const resolvers = {
  Mutation: {
    signup: async (_, { name, email, password, usertype }) => {
      try {
        // Here check if user sends data null or not
        if (!name || name.trim() === "" ||
          !email || email.trim() === "" ||
          !password || password.trim() === "" ||
          !usertype || usertype.trim() === "") {
          return {
            user: null,
            message: 'Please add all required fields data',
            success: false,
          };
        }

        // Check if the email already exists
        const checkEmailIDExitOrNot = await User.findOne({ email });
        if (checkEmailIDExitOrNot) {
          return {
            user: null,
            message: 'This email ID already exists',
            success: false,
          };
        }

        password = await bcrypt.hash(password, 10);

        // Create user and save in database
        const signupUser = new User({ name, email, password, usertype });
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
