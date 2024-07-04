import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import FacebookStrategy from "passport-facebook";
import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";
import bcrypt from "bcryptjs";

passport.use(
    new GoogleStrategy.Strategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: '/api/auth/google/callback'
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let user = await User.findOne({ googleId: profile.id});

                if (!user) {
                    user = await User.create({
                      googleId: profile.id,
                      firstName: profile.name.givenName,
                      lastName: profile.name.familyName,
                      email: profile.emails[0].value,
                      role: 'user',
                    });
                  }

                  generateTokenAndSetCookie(user._id, done);
            } catch (error) {
                console.log('Error in google auth strategy: ', error);
                return done(error, null);
            }
        }
    )
);

passport.use(
    new FacebookStrategy.Strategy(
        {
            clientID: process.env.META_CLIENT_ID,
            clientSecret: process.env.META_CLIENT_SECRET,
            callbackURL: '/api/auth/facebook/callback',
            profileFields: ['id', 'displayName', 'email']
        },
        async(accessToken, refreshToken, profile, done) => {
            try {
                let user = await User.findOne({ facebookId: profile.id });

                if (!user) {
                    user = await User.create({
                        facebookId: profile.id,
                        firstName: profile.displayName,
                        email: profile.emails ? profile.emails[0].value : '',
                        role: 'user'
                    });
                }

                generateTokenAndSetCookie(user._id, done)
            } catch (error) {
                console.log('Error in facebook auth strategy: ', error);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });