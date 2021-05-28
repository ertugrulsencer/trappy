const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log(req.headers);
  if (!authHeader) return res.sendStatus(400);
  const token = authHeader.split(" ")[1];
  if (!authHeader || !token) {
    return res
      .status(401)
      .json({ message: "No token or Authorization header" });
  } else {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err) => {
      if (err) return res.status(401).json({ message: err });
      next();
    });
  }
};
