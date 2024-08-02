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

// Configure GitHub Strategy
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "/api/auth/github/callback"
},
    async (accessToken, refreshToken, profile, done) => {
        try {
            let user = await User.findOne({ githubId: profile.id });
            if (!user) {
                user = await User.create({
                    name: profile.displayName,
                    email: profile.emails && profile.emails.length > 0 ? profile.emails[0].value : 'no-email@example.com',
                    githubId: profile.id,
                });
            }
            return done(null, user);
        } catch (err) {
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
            let user = await User.findOne({ linkedinId: profile.id });
            if (!user) {
                user = await User.create({
                    name: profile.displayName,
                    email: profile.emails && profile.emails.length > 0 ? profile.emails[0].value : 'no-email@example.com',
                    linkedinId: profile.id,
                });
            }
            return done(null, user);
        } catch (err) {
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
