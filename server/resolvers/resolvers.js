const User = require('../models/User');

const AvailableSlot = require('../models/AvailableSlot');

const Provider = require('../models/Provider');
const Category = require('../models/Category');
const Review = require('../models/Review');
const Service = require('../models/Service');
const Booking = require('../models/Booking');
const bcrypt = require('bcrypt');
const stripe = require('stripe')('sk_test_51QL7z8Kj9iJCHOweCCx4FVhQ70ZxP8qF6pz8qp1dktHVl9YIHnDmD7NCTNuoTnEWuhhNUL6A3V27aDL9wYGhVEIV007KkN3vOA');
const Payment = require('../models/Payment');

const resolvers = {
  Query: {
    providers: async (_, { categoryId, location, minRating }) => {
      try {
        const filters = {};
    
        if (categoryId) {
          filters.category = categoryId;
        }
        if (location) {
          filters['location.address'] = { $regex: location, $options: 'i' };
        }
        if (minRating) {
          filters.ratings = { $gte: minRating };
        }
    
        const providers = await Provider.find(filters)
          .populate('user_id') 
          .populate('category')
          .populate('reviews'); 
    
        return providers;
      } catch (error) {
        console.error('Error fetching providers:', error);
        throw new Error('Failed to fetch providers: ' + error.message);
      }
    },
    

    users: async () => {
      try {
        return await User.find(); 
      } catch (error) {
        console.error("Error fetching users:", error);
        return null;
      }
    },
    providers: async (_, { categoryId, location, minRating }) => {
      try {
        const filters = {};
        if (categoryId) filters.services = categoryId;
        if (minRating) filters.ratings = { $gte: minRating };
        // Optionally add location-based filtering here
        return await Provider.find(filters).populate('user_id');
      } catch (error) {
        console.error("Error fetching providers:", error);
        throw new Error("Failed to fetch providers");
      }
    },
    providers: async () => {
      try {
        return await Provider.find().populate('user_id'); // Populates the `user_id` field
      } catch (error) {
        console.error("Error fetching providers:", error);
        throw new Error("Failed to fetch providers");
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
    fetchUserProfile: async (_, { id }) => {
      try {
        console.log(`fetchUserProfile: Fetching profile for user ID ${id}`); // Add logging
        const user = await User.findById(id);
        if (!user) {
          console.error(`fetchUserProfile: No user found with ID ${id}`);
          throw new Error('User not found');
        }
        console.log(`fetchUserProfile: Retrieved user ${JSON.stringify(user)}`);
        return user;
      } catch (error) {
        console.error(`Error in fetchUserProfile: ${error.message}`);
        throw new Error('Error fetching user profile: ' + error.message);
      }
    },
    getBookingCounts: async (_, { userId }) => {
      try {

        const totalBookings = await Booking.countDocuments({ user_id: userId });
        const upcomingBookings = await Booking.countDocuments({
          user_id: userId,
          status: 'pending'
        });

        return {
          totalBookings,
          upcomingBookings
        };
      } catch (error) {
        throw new Error("Error fetching booking counts: " + error.message);
      }
    },
    fetchUserBookingHistory: async (_, { userId }) => {
      try {
        const bookings = await Booking.find({ user_id: userId })
          .populate({
            path: 'booking_services.service_id',
            select: 'service_name',
            match: { service_name: { $ne: null } },
          })
          .exec();


        bookings.forEach((booking) => {
          booking.booking_services = booking.booking_services.filter(
            (service) => service.service_id
          );
        });

        return bookings;
      } catch (error) {
        throw new Error('Error fetching booking history: ' + error.message);
      }
    },
    getBookingWithReview: async (_, { bookingId }) => {
      try {
        const booking = await Booking.findById(bookingId)
          .populate('user_id', 'username')
          .populate('provider_id', 'bio')
          .populate({
            path: 'booking_services.service_id',
            select: 'service_name description pricing',
          });

        if (!booking) {
          throw new Error('Booking not found');
        }

        const review = await Review.findOne({
          user_id: booking.user_id,
          provider_id: booking.provider_id,
          service_id: booking.booking_services[0]?.service_id,
        });

        return { booking, review };
      } catch (error) {
        throw new Error('Error fetching booking with review: ' + error.message);
      }
    },
    services: async () => {
      // Populate category details
      return await Service.find().populate('category_id');
    },
    categories: async () => {
      return await Category.find();
    },
    category: async (_, { id }) => {
      return await Category.findById(id);
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

        const user = await User.findOne({ email: { $regex: new RegExp(`^${email}$`, 'i') } });
        if (!user) {
          return {
            user: null,
            message: "This email ID does not exist",
            success: false,
          };
        }

        const fixedSalt = '$2b$10$abcdefghijklmnopqrstuv'; 
        const password_hash = await bcrypt.hash(password, fixedSalt);

        if(password_hash != user.password){
          return {
            user: null,
            message: 'Invalid Password ',
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

        if (password.length < 7) {
          return {
            message: 'Password length shoude be more then 6 digit.',
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

        const fixedSalt = '$2b$10$abcdefghijklmnopqrstuv'; 
        const password_hash = await bcrypt.hash(password, fixedSalt);

        const signupUser = new User({ username, email, password: password_hash, role });
        await signupUser.save();

        if (role.toLowerCase() === 'provider') {
          const user_id = signupUser._id;
          const providerUser = new Provider({ user_id });
          await providerUser.save();
        }

        return {
          user: signupUser,
          message: 'Signup successfully',
          success: true,
        };
      } catch (error) {
        throw new Error('Internal server error' + error);
      }
    },

    // This is available slot mutation
    availableslot: async (_, { provider_id }) => {
      try {
        if (!provider_id || provider_id.trim() === "") {
          return {
            availableSlot: null,
            message: 'Invalid provider ID',
            success: false,
          };
        }

        // Check if the provider exists
        const provider = await Provider.findById(provider_id);
        if (!provider) {
          return {
            availableSlot: null,
            message: 'This provider ID does not exist',
            success: false,
          };
        }

        // Fetch a single available slot for the provider (adjust criteria as needed)
        const availableSlot = await AvailableSlot.findOne({ provider_id });
        if (!availableSlot) {
          return {
            availableSlot: null,
            message: 'No available slots found for this provider',
            success: false,
          };
        }

        return {
          availableSlot,
          message: 'Available slot retrieved successfully',
          success: true,
        };
      } catch (error) {
        return {
          availableSlot: null,
          message: 'Internal server error: ' + error.message,
          success: false,
        };
      }
    },

    modifyUserProfile: async (_, { id, username, email, phone_number, address, password }) => {
      try {
        const user = await User.findById(id);
        if (!user) {
          throw new Error('User not found');
        }

        user.username = username || user.username;
        user.email = email || user.email;
        user.phone_number = phone_number || user.phone_number;
        user.address = address || user.address;

        if (password) {
          user.password = await bcrypt.hash(password, 10); // Hash the password
        }

        const updatedUser = await user.save();
        return updatedUser;
      } catch (error) {
        throw new Error('Error updating user profile: ' + error.message);
      }
    },

    addReview: async (_, { bookingId, rating, comment }) => {
      try {
        const booking = await Booking.findById(bookingId);
        if (!booking) {
          throw new Error('Booking not found');
        }
        if (booking.status !== 'completed') {
          throw new Error('Review can only be added for completed bookings');
        }

        const review = new Review({
          user_id: booking.user_id,
          provider_id: booking.provider_id,
          service_id: booking.booking_services[0]?.service_id,
          rating,
          comment,
        });

        await review.save();
        return review;
      } catch (error) {
        throw new Error('Error adding review: ' + error.message);
      }
    },


    createPaymentIntent: async (_, { amount, booking }) => {
      try {
        const originalAmount = amount;
        //Here 100 convert cad amount 
        amount = amount * 100;
        const paymentIntent = await stripe.paymentIntents.create({
          amount,
          currency: 'cad',
          automatic_payment_methods: { enabled: true },
        });

        const newBooking = new Booking({
          ...booking,
        });
        const savedBooking = await newBooking.save();


        const newPayment = new Payment({
          booking_id: savedBooking._id, 
          amount: originalAmount,
          payment_method: "Credit Card",
          payment_status: "paid"
        });
        await newPayment.save();

        return {
          payment: {
            clientSecret: paymentIntent.client_secret,
          },
          message: "Payment processing initiated",
          success: true
        };
      } catch (error) {
        return {
          payment: {
            clientSecret: null,
            message: error.message,
            success: false
          },
          message: "Failed to create payment intent" + error,
          success: false
        };
      }
    },

    updateUser: async (_, { id, username, email, role, phone_number, address }) => {
      try {
        const updatedUser = await User.findByIdAndUpdate(
          id,
          { username, email, role, phone_number, address },
          { new: true }
        );
        return updatedUser;
      } catch (error) {
        console.error("Error updating user:", error);
        throw new Error("Update failed");
      }
    },

    updateProvider: async (_, { id, bio, location, image, ratings }) => {
      try {
        const updatedProvider = await Provider.findByIdAndUpdate(
          id,
          { bio, location, image, ratings },
          { new: true }
        ).populate('user_id'); // Ensure population if required
        return updatedProvider;
      } catch (error) {
        console.error("Error updating provider:", error);
        throw new Error("Failed to update provider");
      }
    },

    deleteProvider: async (_, { id }) => {
      try {
        const deletedProvider = await Provider.findByIdAndDelete(id);
        if (!deletedProvider) {
          throw new Error("Provider not found");
        }
        return deletedProvider;
      } catch (error) {
        console.error("Error deleting provider:", error);
        throw new Error("Failed to delete provider");
      }
    },

    deleteUser: async (_, { id }) => {
      try {
        const deletedUser = await User.findByIdAndDelete(id);
        return deletedUser;
      } catch (error) {
        console.error("Error deleting user:", error);
        throw new Error("Delete failed");
      }
    },

    // This is Check Email ID Mutation
    checkEmailID: async (_, { email }) => {
      try {
        if (!email || email.trim() === "") {
          return {
            message: 'Please ente email ID',
            success: false,
          };
        }

        const user = await User.findOne({ email });
        if (user) {
          return {
            message: "This email ID exist",
            success: true,
          };
        }

        return {
          message: 'This email ID does not exit',
          success: false,
        };
      } catch (error) {
        throw new Error('Internal server error' + error);
      }
    },

    // This is forgot password
    forgotPassword: async (_, { userId, newPassword }) => {
      try {
        if (!userId || userId.trim() === "") {
          return {
            message: 'Please ente user ID',
            success: false,
          };
        }

        if (!newPassword || newPassword.trim() === "") {
          return {
            message: 'Please ente password',
            success: false,
          };
        }

        if (newPassword.length < 7) {
          return {
            message: 'Password length shoude be more then 6 digit.',
            success: false,
          };
        }

        // Hash the new password
        const fixedSalt = '$2b$10$abcdefghijklmnopqrstuv';
        const password = await bcrypt.hash(newPassword, fixedSalt);

        const updatedUser = await User.findByIdAndUpdate(
          userId,
          { password },
          { new: true }
        );

        if (!updatedUser) {
          return {
            message: "User not found",
            success: false,
          };
        }

        return {
          message: "Password updated successfully",
          success: true,
        };
      } catch (error) {
        throw new Error('Internal server error' + error);
      }
    },

    updateService: async (_, { id, service_name, description, pricing, category_id }) => {
      const updatedService = await Service.findByIdAndUpdate(
        id,
        { service_name, description, pricing, category_id, updated_at: Date.now() },
        { new: true }
      ).populate('category_id');
      return updatedService;
    },

    deleteService: async (_, { id }) => {
      const deletedService = await Service.findByIdAndDelete(id);
      return deletedService;
    },

    createCategory: async (_, { category_name, description }) => {
      const newCategory = new Category({ category_name, description });
      return await newCategory.save();
    },

    updateCategory: async (_, { id, category_name, description }) => {
      const updatedCategory = await Category.findByIdAndUpdate(
        id,
        { category_name, description, updated_at: Date.now() },
        { new: true }
      );
      return updatedCategory;
    },

    deleteCategory: async (_, { id }) => {
      const deletedCategory = await Category.findByIdAndDelete(id);
      return deletedCategory;
    },
    createCategory: async (_, { category_name, description }) => {
      const newCategory = new Category({
        category_name,
        description,
      });
      return await newCategory.save();
    },

    updateCategory: async (_, { id, category_name, description }) => {
      return await Category.findByIdAndUpdate(
        id,
        { category_name, description, updated_at: Date.now() },
        { new: true }
      );
    },

    deleteCategory: async (_, { id }) => {
      return await Category.findByIdAndDelete(id);
    },
  },
  Service: {
    category: async (parent) => {
      return await Category.findById(parent.category_id);
    },
  },
};

module.exports = resolvers;
