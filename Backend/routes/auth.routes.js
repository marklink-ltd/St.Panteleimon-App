import express from 'express';
import { signup, login, logout } from '../controllers/auth.controller.js';
import passport from 'passport';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', logout);

// Google OAuth login
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
  res.redirect('/');
});

// Meta OAuth login
router.get('/facebook', passport.authenticate('facebook'));
router.get('/facebook/callback', passport.authenticate('facebook', {failureRedirect: '/'}), (req, res) => {
    res.redirect('/');
})

export default router;
