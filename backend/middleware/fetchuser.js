const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'HELLO DEV IS A GOOD DEV'; // Use environment variable

const fetchuser = (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) {
    return res.status(401).json({ error: 'Token not provided' });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = {
      id: data.user.id,
      username: data.user.username, // Ensure these fields are in the token payload
      email: data.user.email,
      gmailUsername: data.user.gmailUsername,
    };
    next();
  } catch (error) {
    console.error('Error verifying token:', error.message);
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

module.exports = fetchuser;
