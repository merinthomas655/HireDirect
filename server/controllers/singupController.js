const User = require('../models/Singup');

// Here create new user entry
exports.createUser = async (req, res) => {
    try {
        const { username, email, password,usertype } = req.body;

        // Here check user send data null or not 
        if (!username || !email || !password || !usertype) {
            return res.status(400).json({ message: 'Please add all required fields data' });
        }

        // Here create user and save in database
        const singupUser = new User({ username, email, password,usertype });
        const newUser = await singupUser.save();

        res.status(200).json({ message: 'Singup successfully', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get user data base on user ID
exports.getUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'This User ID not found' });
        }

        res.status(200).json({ message: 'Get user data successfully', user: user });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};
