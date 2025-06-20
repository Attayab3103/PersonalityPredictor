const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;  // Import the Facebook Strategy
const User = require('../models/User');

// Google Strategy (unchanged)
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "https://personality-predictor-l9tt.onrender.com/api/auth/google/callback",
    proxy: true
  },
  async function(accessToken, refreshToken, profile, done) {
    try {
      let user = await User.findOne({ 
        $or: [
          { email: profile.emails[0].value },
          { googleId: profile.id }
        ]
      });
      
      if (!user) {
        const randomPassword = Math.random().toString(36).slice(-8);
        user = await User.create({
          name: profile.displayName,
          email: profile.emails[0].value,
          password: randomPassword,
          googleId: profile.id,
          profilePic: profile.photos?.[0]?.value || ''
        });
      } else if (!user.googleId) {
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

// Facebook Strategy (new addition)
passport.use(new FacebookStrategy({
    clientID: process.env.FB_APP_ID,
    clientSecret: process.env.FB_APP_SECRET,
    callbackURL: process.env.NODE_ENV === 'production' 
      ? "https://personality-predictor-l9tt.onrender.com/api/auth/facebook/callback"
      : "http://localhost:5000/api/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'email', 'photos']
  },
  async function(accessToken, refreshToken, profile, done) {
    try {
      let user = await User.findOne({ 
        $or: [
          { email: profile.emails[0].value },
          { facebookId: profile.id }
        ]
      });
      
      if (!user) {
        const randomPassword = Math.random().toString(36).slice(-8);
        user = await User.create({
          name: profile.displayName,
          email: profile.emails[0].value,
          password: randomPassword,
          facebookId: profile.id,
          profilePic: profile.photos?.[0]?.value || ''
        });
      } else if (!user.facebookId) {
        user.facebookId = profile.id;
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

// Serialize and deserialize for session handling (unchanged)
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
