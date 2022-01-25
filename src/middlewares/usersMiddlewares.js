const jwt = require('jsonwebtoken');
const connection = require('../model/connection');

const verifyName = (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({
      message: 'Invalid entries. Try again.',
    });
  }
  next();
};

const verifyEmail = (req, res, next) => {
  const { email } = req.body;

  if (!email || !email.includes('@') || !email.includes('.')) {
    return res.status(400).json({
      message: 'Invalid entries. Try again.',
    });
  }

  next();
};

const verifyPassword = (req, res, next) => {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({
      message: 'Invalid entries. Try again.',
    });
  }

  next();
};

const verifyIfEmailExistsInDb = async (req, res, next) => {
  const { email } = req.body;
  const db = await connection();

  const verifyEmailExists = await db.collection('users').find({ email }).toArray();

  const verify = await verifyEmailExists.some((user) => user.email === email);

  if (verify) {
    return res.status(409).json({
      message: 'Email already registered',
    });
  }

  next();
};

const verifyIfAsAdmin = (req, res, next) => {
  const token = req.headers.authorization;

  const decoded = jwt.decode(token);

  if (decoded.role !== 'admin') {
    return res.status(403).json({
      message: 'Only admins can register new admins',
    });
  }

  next();
};

module.exports = {
  verifyName,
  verifyEmail,
  verifyPassword,
  verifyIfEmailExistsInDb,
  verifyIfAsAdmin,
};
