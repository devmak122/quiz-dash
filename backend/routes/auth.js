const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchUser = require("../middleware/fetchuser");
const passport = require('passport');
const multer = require('multer');
const path = require('path');


const JWT_SECRET = "HELLO DEV IS A GOOD DEV"; // Replace this with your own secret

// Multer setup for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

// Route 1: Create user
router.post(
  "/register",
  upload.single('resume'),
  [
    // Add your validations here if needed
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ error: "A user with this email already exists" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: hashedPassword,
        collegeName: req.body.collegeName,
        degree: req.body.degree,
        interestedSubject: req.body.interestedSubject,
        skillSets: req.body.skillSets,
        yearsOfExperience: req.body.yearsOfExperience,
        resume: req.file.path // Store the file path
      });

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(payload, JWT_SECRET, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

// Route 2: Login auth
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Please enter a valid email address"),
    body("password").isLength({ min: 5 }).withMessage("Password must be at least 5 characters long"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      console.log("Login attempt with email:", email);
      let user = await User.findOne({ email });
      if (!user) {
        console.log("User not found.");
        return res.status(400).json({ error: "Please try to login with correct credentials" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        console.log("Incorrect password.");
        return res.status(400).json({ error: "Please try to login with correct credentials" });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (error) {
      console.error("Error during login:", error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// Route 3: Get user details (login required)
router.post(
  "/getuser",
  fetchUser,
  async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select("-password");
      res.json(user);
    } catch (error) {
      console.error("Error getting user details:", error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Successful authentication, redirect home or where you want.
    res.redirect('/dashboard');
  });

// GitHub Auth Routes
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    // Successful authentication, redirect home or where you want.
    res.redirect('/dashboard');
  });

// LinkedIn Auth Routes
router.get('/linkedin', passport.authenticate('linkedin', { state: 'SOME STATE' }));

router.get('/linkedin/callback',
  passport.authenticate('linkedin', { failureRedirect: '/' }),
  (req, res) => {
    // Successful authentication, redirect home or where you want.
    res.redirect('/dashboard');
  });

module.exports = router;
