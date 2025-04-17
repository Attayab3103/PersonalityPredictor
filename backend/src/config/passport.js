const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/api/auth/google/callback",
    proxy: true
  },
  async function(accessToken, refreshToken, profile, done) {
    try {
      // Check if user already exists by email or googleId
      let user = await User.findOne({ 
        $or: [
          { email: profile.emails[0].value },
          { googleId: profile.id }
        ]
      });
      
      if (!user) {
        // Create new user if doesn't exist
        const randomPassword = Math.random().toString(36).slice(-8);
        user = await User.create({
          name: profile.displayName,
          email: profile.emails[0].value,
          password: randomPassword,
          googleId: profile.id,
          profilePic: profile.photos?.[0]?.value || ''
        });
      } else if (!user.googleId) {
        // If user exists but doesn't have googleId (signed up with email), link accounts
        user.googleId = profile.id;
        if (!user.profilePic && profile.photos?.[0]?.value) {
          user.profilePic = profile.photos[0].value;
        }
        await user.save();
      }
      
      return done(null, user);
    } catch (error) {
      return done(error, null);
    }
  }
));

// These are required for maintaining the session
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

module.exports = passport;