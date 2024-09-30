const User = require('../models/User');
const bcrypt = require('bcrypt');


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
        const exitUser = await User.findOne({ email });
        if (exitUser) {
          return {
            user: null,
            message: 'This email ID already exists',
            success: false,
          };
        }

        // Here check user role match or not 
        if (!['user', 'provider', 'admin'].includes(role.toLowerCase())) {
          return {
            user: null,
            message: 'Invalid role provided',
            success: false,
          };
        }

        const password_hash = await bcrypt.hash(password, 10);


        // Create user and save in database
        const signupUser = new User({ username, email, password_hash, role });
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
