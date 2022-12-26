const jwt = require("jsonwebtoken");

const verifyTokenAndAuthorization = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      if (err) res.status(403).json("Token is not valid!");
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated!");
  }
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyTokenAndAuthorization(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not admin!");
    }
  });
};

module.exports = { verifyTokenAndAuthorization, verifyTokenAndAdmin };
