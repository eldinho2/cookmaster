const jwt = require('jsonwebtoken');
const connection = require('../model/connection');

const SECRET = 'ODRUHGUIDRHGUDHSUIEFSIKFHSJKMEDRGHDRHDRHDRVBDFJHNGJFGYHJRTH';

const createToken = async (req, res) => {
  try {
    const { email } = req.body;

    const db = await connection();
  
    const catchUser = await db.collection('users').find({ email }).toArray();
  
    const { _id, role } = catchUser[0];

    const token = jwt.sign({ _id, email, role }, SECRET, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (e) {
    console.log('createToken MODEL', e);
  }
};

const verifTokenJwt = (req, res, next) => {
  const token = req.headers.authorization;

  jwt.verify(token, SECRET, (err) => {
    if (err) {
      return res.status(401).json({ message: 'jwt malformed' });
    }
  });
  
  next();
};

module.exports = {
  createToken,
  verifTokenJwt,
};
