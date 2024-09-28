const User = require('../models/Login');

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
          const checkEmailIDExitOrNot = await User.findOne({ email });

          if (!checkEmailIDExitOrNot) {
            return {
              user: null,
              message: checkEmailIDExitOrNot,
              success: false,
            };
          }
  
  
          // Create user and save in database
          //const signupUser = new User({ name, email, password, usertype });
  
          return {
            user: null,
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
  