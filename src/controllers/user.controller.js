const sessionModel = require('../models/session.model');
const createJWT = require('../middlewares/jwt.middleware').createJWT;

/* 
 * Return the user data for the logged in user
 * @return {userInfo} msg
 * @example
 * {
 *  "userInfo": {
 *	  "id": 11,
 *	  "type": 2,
 *	  "doc": "222318",
 *	  "name": "Matheus Rodrigues",
 *	  "username": "matheus",
 *	  "email": "m222318@dac.unicamp.br",
 *	  "phone": "19 98405-7447",
 *	  "last_login": "2022-06-10T10:10:41.000Z",
 *	  "creation_date": "2022-06-01T10:11:49.000Z",
 *	  "iat": 1654845046
 *	}
 * }
*/
async function loggedInUserInfo(req, res, next) {
  res.status(200).json({
    userInfo: req.userInfo
  });
}


module.exports = {
  loggedInUserInfo,
};