const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const User = require("../models/user");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

async function authMiddleware(req, res, next) {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      console.error("No token provided in Authorization header");
      return res.status(401).json({ error: "Access denied! No Token provided" });
    }

    // Try JWT verification first (for credentials login and admin)
    try {
      const decoded = jwt.verify(token, process.env.AUTH_SECRET || "supersecretkey");
      // Attach user info and set x-user-id for downstream
      req.user = decoded;
      // Ensure req.user.userId is set for downstream services
      if (!req.user.userId && req.user.sub) {
        req.user.userId = req.user.sub;
      }
      req.headers["x-user-id"] = req.user.userId || req.user.sub;
      return next();
    } catch (jwtError) {
      // If JWT verification fails, try Google OAuth
    }

    // Google OAuth verification (for Google login)
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    req.user = payload;
    // Ensure req.user.userId is set for downstream services
    if (!req.user.userId && req.user.sub) {
      req.user.userId = req.user.sub;
    }
    req.headers["x-user-id"] = req.user.userId || req.user.sub;
    return next();
  } catch (error) {
    console.error("Token verification failed:", error.message);
    console.error("Error details:", error);
    res.status(401).json({ error: "Access denied! Please login to continue" });
  }
}

module.exports = authMiddleware;
