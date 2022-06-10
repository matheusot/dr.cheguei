const jwt = require("jsonwebtoken");


/* 
 * Create JWT token with userData
 * @param {object} userData
 * @return {string} token
*/
function createJWT(userData) {
  const privateKey = require("../configs/jwt.config").privateKey;
  return new Promise((resolve, reject) => {
    jwt.sign(userData, privateKey, (err, token) => {
      if (err) reject(err)
      else resolve(token)
    });
  })
}


/* 
 * Check JWT token
 * @param {string} token
*/
const checkJWT = (req, res, next) => {
  const token = req.headers["authorization"];
  const privateKey = require("../configs/jwt.config").privateKey;
  jwt.verify(token, privateKey, (err, userInfo) => {
    if (err) {
      res.status(401).json({
        msg: "Invalid Token",
      })
      return;
    }
    req.userInfo = userInfo;
    next();
  });
};


module.exports = {
  createJWT,
  checkJWT,
}