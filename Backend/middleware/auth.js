import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/user.model.js';

dotenv.config();

const isAuth = async (req, res, next) => {
  try {
    if (req.headers && req.headers.cookie) {
      const cookies = req.headers.cookie.split(';').reduce((cookies, cookie) => {
        const [name, value] = cookie.trim().split('=').map(decodeURIComponent);
        cookies[name] = value;
        return cookies;
      }, {});

      const token = cookies.jwt;

      if (!token) {
        return res.status(401).json({ error: 'Unauthorized - No JWT token found' });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findById(decoded.userId);
      console.log(decoded.user._id);

      if (!user) {
        return res.status(400).json({ error: 'Invalid Token - User not found' });
      }

      req.user = user;
      next();
    } else {
      return res.status(401).json({ error: 'Unauthorized - No cookies found' });
    }
  } catch (error) {
    console.error('Error in authentication middleware:', error.message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default isAuth;
