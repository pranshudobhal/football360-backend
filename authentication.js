const jwt = require('jsonwebtoken');

const verifyAuth = (req, res, next) => {
  const token = req.headers.authorization;

  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    req.user = { userID: decoded.userID };
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Unauthorized access! Token is not present!!!' });
  }
};

module.exports = { verifyAuth };
