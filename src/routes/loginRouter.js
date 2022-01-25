const router = require('express').Router();

const {
  verifyEmailInDb,
  verifyPasswordInDb,
  verifyEmail,
  verifyPassword,
} = require('../middlewares/loginMiddlewares');

const {
  createToken, 
} = require('../utils/jwt');

router.post('/', verifyEmail, verifyPassword, verifyEmailInDb, verifyPasswordInDb, createToken);

module.exports = router;
