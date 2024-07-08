import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import cors from "cors"

import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import forgotPasswordRoutes from "./routes/forgotPassword.routes.js";
import connectToMongoDB from './db/connectToMongoDB.js';
import "./passport/passport.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: 'http://192.168.1.3:8081', credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Express session middleware
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 24 * 60 * 60 * 1000 }
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/forgot-password', forgotPasswordRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Connect to MongoDB
connectToMongoDB().catch((err) =>
  console.error('Error connecting to MongoDB:', err.message)
);

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
