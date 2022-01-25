const router = require('express').Router();

const {
  verifyName,
  verifyEmail,
  verifyPassword,
  verifyIfEmailExistsInDb,
  verifyIfAsAdmin,
} = require('../middlewares/usersMiddlewares');

const {
  insertUser,
  insertAdminUser,
} = require('../controllers/usersControllers');

router.post('/', verifyIfEmailExistsInDb, verifyName, verifyEmail, verifyPassword, insertUser);

router.post('/admin',
  verifyIfAsAdmin,
  verifyIfEmailExistsInDb,
  verifyName,
  verifyEmail,
  verifyPassword,
  insertAdminUser);

module.exports = router;
