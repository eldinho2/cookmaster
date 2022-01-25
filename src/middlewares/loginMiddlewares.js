const connection = require('../model/connection');

const verifyEmailInDb = async (req, res, next) => {
  try {
    const { email } = req.body;

    const db = await connection();

    const verifyEmailExists = await db.collection('users').find({ email }).toArray();

    const verify = await verifyEmailExists.some((user) => user.email === email);

    if (!verify) return res.status(401).json({ message: 'Incorrect username or password' });

  next();
  } catch (error) {
    console.log('verifyEmailInDb ERROOOOOOR', error);
  }
};

const verifyEmail = (req, res, next) => {
  const { email } = req.body;

  if (!email) return res.status(401).json({ message: 'All fields must be filled' });

  next();
};

const verifyPassword = (req, res, next) => {
  const { password } = req.body;

if (!password) return res.status(401).json({ message: 'All fields must be filled' });

  next();
};

const verifyPasswordInDb = async (req, res, next) => {
  try {
    const { password } = req.body;

    const db = await connection();

    const verifyPasswordExists = await db.collection('users').find({ password }).toArray();

    const verify = await verifyPasswordExists.some((user) => user.password === password);

    if (!verify) return res.status(401).json({ message: 'Incorrect username or password' });

    next();
  } catch (error) {
    console.log('verifyPasswordInDb ERROOOOOOR', error);
  }
};

module.exports = {
  verifyEmailInDb,
  verifyPasswordInDb,
  verifyEmail,
  verifyPassword,
};
