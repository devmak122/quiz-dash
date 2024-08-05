const express = require('express');
const connectToMongo = require('./db');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const passportSetup = require('./config/passport');
const authRoutes = require('./routes/auth');
const path = require('path');
const slotRoutes = require('./routes/slots');


const app = express();
const port = 5000;

// Connect to MongoDB
connectToMongo();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Session middleware configuration
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    client: mongoose.connection.getClient(),
    collectionName: 'sessions',
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 1 day
  }
}));

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/slots', slotRoutes);

app.listen(port, () => {
  console.log(`Dashboard Backend listening at http://localhost:${port}`);
});
