const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb');
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

const verifyIngredients = (req, res, next) => {
  const { ingredients } = req.body;

  if (!ingredients) {
    return res.status(400).json({
      message: 'Invalid entries. Try again.',
    });
  }
  next();
};

const verifyPreparation = (req, res, next) => {
  const { preparation } = req.body;

  if (!preparation) {
    return res.status(400).json({
      message: 'Invalid entries. Try again.',
    });
  }
  next();
};

const verifyId = (req, res, next) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(404).json({
      message: 'recipe not found',
    });
  }
  next();
};

const validateToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || authorization === '') {
    return res.status(401).json({
      message: 'missing auth token',
    });
  }

  next();
};

const verifyTokenIntegrity = (req, res, next) => {
  const token = req.headers.authorization;
  const decode = jwt.decode(token);

  if (!decode || !decode.role) {
    return res.status(401).json({
      message: 'jwt malformed',
    });
  }
  next();
};

const findId = async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  const db = await connection();
  const recipe = await db.collection('recipes').findOne({ _id: ObjectId(id) });

  if (!recipe) {
    return res.status(404).json({
      message: 'ID(recipe) not found',
    });
  }
  next();
};

module.exports = {
  verifyName,
  verifyIngredients,
  verifyPreparation,
  verifyId,
  validateToken,
  verifyTokenIntegrity,
  findId,
};
