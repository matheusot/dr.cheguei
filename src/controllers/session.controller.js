const sessionModel = require('../models/session.model');
const createJWT = require('../middlewares/jwt.middleware').createJWT;



/* 
 * Authenticate with HC or username/password
*/
async function auth(req, res, next) {
  if (req.body.hc) {
    return authHC(res, req.body.hc)
  }
  return authAdmin(res, req.body.username, req.body.password)
}



/* 
 * Authenticate with HC or username/password
*/
async function logout(req, res, next) {
  res.status(200).json({
    msg: "User logged out",
    token: ""
  });
}




/* 
 * Authenticate with HC if at least one appointment is found
 * @param {string} hc
 * @return {object} msg
 * @example
 * {
 *  "msg": "HC authenticated"
 * }
*/
async function authHC(res, hc) {
  const count = await sessionModel.HCAppointmentCount(hc);
  if (count == 0) {
    res.status(401).json({
      msg: "HC not found"
    });
    return
  } 
  const token = await createJWT({hc});
  res.status(200).json({
    msg: "HC authenticated",
    token: token
  });
}




/* 
 * Authenticate with username and password
 * @param {string} username
 * @param {string} password
 * @return {object} msg
 * @example
 * {
 *  "msg": "User authenticated"
 * }
*/
async function authAdmin(res, username, password) {
  const user = await sessionModel.loginWithUsernameAndPassword(username, password);
  if (user == null) {
    res.status(401).json({
      msg: "User or password incorrect"
    });
    return
  } 
  const token = await createJWT(user);
  res.status(200).json({
    msg: "User authenticated",
    token: token
  });
}




module.exports = {
  auth,
  logout,
};