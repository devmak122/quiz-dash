require('dotenv').config();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github').Strategy;
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const User = require('../models/user');

// Configure Google Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/auth/google/callback"
},
    async (accessToken, refreshToken, profile, done) => {
        try {
            let user = await User.findOne({ googleId: profile.id });
            if (!user) {
                user = await User.create({
                    name: profile.displayName,
                    email: profile.emails && profile.emails.length > 0 ? profile.emails[0].value : 'no-email@example.com',
                    googleId: profile.id,
                });
            }
            return done(null, user);
        } catch (err) {
            return done(err, false);
        }
    }));

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "/api/auth/github/callback"
},
    async (accessToken, refreshToken, profile, done) => {
        try {
            console.log('GitHub Profile:', profile); // Log profile data for debugging

            // Check if user already exists with either email or GitHub ID
            let user = await User.findOne({ githubId: profile.id });
            if (!user) {
                // Handle case where email is missing
                const email = profile.emails && profile.emails.length > 0 ? profile.emails[0].value : `no-email-${profile.id}@example.com`;

                // Find user by email to avoid duplication
                user = await User.findOne({ email });
                if (!user) {
                    // Create a new user if not found
                    user = await User.create({
                        name: profile.displayName || 'No Name',
                        email,
                        githubId: profile.id,
                    });
                }
            }
            return done(null, user);
        } catch (err) {
            console.error('Error in GitHub strategy:', err);
            return done(err, false);
        }
    }));



// Configure LinkedIn Strategy
passport.use(new LinkedInStrategy({
    clientID: process.env.LINKEDIN_CLIENT_ID,
    clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
    callbackURL: "/api/auth/linkedin/callback",
    scope: ['r_emailaddress', 'r_liteprofile']
},
    async (accessToken, refreshToken, profile, done) => {
        try {
            console.log('LinkedIn Profile:', profile); // Log profile data for debugging

            let user = await User.findOne({ linkedinId: profile.id });
            if (!user) {
                // Handle case where email is missing
                const email = profile.emails && profile.emails.length > 0 ? profile.emails[0].value : `no-email-${profile.id}@example.com`;

                // Create a new user if not found
                user = await User.create({
                    name: profile.displayName || 'No Name',
                    email,
                    linkedinId: profile.id,
                });
            }
            return done(null, user);
        } catch (err) {
            console.error('Error in LinkedIn strategy:', err);
            return done(err, false);
        }
    }));



// Serialize user into the session
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Deserialize user from the session
passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
});

module.exports = passport;
