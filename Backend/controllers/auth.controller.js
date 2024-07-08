import bcrypt from 'bcryptjs';
import User from '../models/user.model.js';
import generateTokenAndSetCookie from '../utils/generateToken.js';

export const signup = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, password, confirmPassword } = req.body;

    // Checking if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match.' });
    }

    // Finding user by email to check if user already exists
    const existingUser = await User.findOne({ email });

    // Finding user by phone to check if user already exists
    const existingPhone = await User.findOne({ phoneNumber });

    if (existingUser) {
      return res.status(400).json({ error: 'User with that email already exists.' });
    }

    if (existingPhone) {
      return res.status(400).json({ error: 'User with that phone number already exists.' });
    }

    const names = fullName.split(' ');
    const firstName = names[0];
    const lastName = names[1];

    // Hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Creating new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      phoneNumber,
      password: hashedPassword,
      role: 'user',
    });

    // Saving the new user
    await newUser.save();

    // Generate JWT token and set cookie
    generateTokenAndSetCookie(newUser._id, res);

    // Respond with user data
    res.status(201).json({
      _id: newUser._id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      phoneNumber: newUser.phoneNumber,
      role: newUser.role,
    });
  } catch (error) {
    console.error('Error in signup controller:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// LOGIN CONTROLLER
export const login = async (req, res) => {
  try {
      const { emailOrPhone, password } = req.body;

      // Check if the input is an email or phone number
      const user = await User.findOne({
          $or: [
              { email: emailOrPhone },
              { phoneNumber: emailOrPhone }
          ]
      });

      if (!user) {
          return res.status(400).json({ error: 'Invalid Credentials.' });
      }

      const isPasswordCorrect = await bcrypt.compare(password, user.password);

      if (!isPasswordCorrect) {
          return res.status(400).json({ error: 'Invalid Credentials.' });
      }

      // If credentials are correct, generate token and set cookie
      generateTokenAndSetCookie(user._id, res);

      // Return user information
      res.status(200).json({
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phoneNumber: user.phoneNumber
      });
  } catch (error) {
      console.error('Error in login controller', error.message);
      res.status(500).json({ error: 'Internal Server Error.' });
  }
};

// LOGOUT CONTROLLER
export const logout = async(req, res) => {
    try {
        res.cookie('jwt', '', {maxAge:0});
        res.status(200).json({message: 'Logged out successfully.'})
    } catch (error) {
        console.log('Error in logout controller', error.message);
        res.status(500).json({error:'Internal Server Error'});
    }
}