const jwt = require("jsonwebtoken");
const JWT_SECRET = "HELLO DEV IS A GOOD DEV"; // Replace this with your own secret

const fetchuser = async(req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    // console.log("Token not provided");
    return res.status(401).json({ error: "Token not provided" });
  }
  try {
    const data =   jwt.verify(token, JWT_SECRET);
    console.log("Decoded token:", data);
    req.user = data.user;
    next();
  } catch (error) {
    console.error("Error verifying token:", error.message);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

module.exports = fetchuser;
