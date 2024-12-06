const jwt = require("jsonwebtoken");

const checkAuth = (req, res, next) => {
  try {
    const verifyToken = jwt.verify(
      req.headers.authorization,
      process.env.THE_SECRET_KEY
    );

    if (!verifyToken) {
      return res.json({ message: "invalid token" });
    }
    
    req.body.userID = verifyToken.id;
    next();
  } catch (error) {
    
    console.error("Error in token verification:", error.message);
    return res
      .status(403)
      .json({ message: "Authentication failed, please login to continue" });
  }
};

module.exports = checkAuth;
