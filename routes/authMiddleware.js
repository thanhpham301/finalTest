const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    try {
      // validate token
      const token = req.headers.authorization.replace("Bearer ", "");
      if (!token) {
        return res.status(401).json({
          message: "Unauthorized",
        });
      }
  
      const { username } = jwt.verify(token, "MY_SECRET_KEY");
      if (username) {
        next();
      } else {
        throw new Error("Unauthorized");
      }
    } catch (error) {
      res.status(401).json({
        message: error.message,
      });
    }
  };
  
  module.exports = {authMiddleware};
