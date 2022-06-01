const authModel = require('../models/auth.model');
const createJWT = require('../middlewares/jwt.middleware').createJWT;


/* 
 * Authenticate with HC if at least one appointment is found
 * @param {string} hc
 * @return {object} msg
 * @example
 * {
 *  "msg": "HC authenticated"
 * }
*/
async function authHC(req, res, next) {
  const { hc } = req.body;
  const count = await authModel.HCAppointmentCount(hc);
  if (count > 0) {
    const token = await createJWT({hc});
    res.set("x-access-token", token);
    res.status(200).json({
      msg: "HC authenticated"
    });
  } else {
    res.status(404).json({
      msg: "HC not found"
    });
  }
}


/* 
 * Check HC authentication with middleware and return HC
 * @return {string} hc
 * @return {object} msg
 * @example
 * {
 *  "msg": "Authenticated with HC: 00000"
 * }
*/
async function checkAuth(req, res, next) {
  const { hc } = req.userInfo;
  res.json({ msg: `Authenticated with HC: ${hc}` });
}


module.exports = {
  authHC,
  checkAuth,
};