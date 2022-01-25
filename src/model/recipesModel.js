const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb');
const connection = require('./connection');

const insertRecipe = async (name, ingredients, preparation, token) => {
  try {
    const db = await connection();
    const decoded = jwt.decode(token);

    const { email } = decoded;

    const getUserId = await db.collection('users').findOne({ email });
    const { _id } = getUserId;

    const insertedRecipe = await db.collection('recipes').insertOne(
      { name, ingredients, preparation, userId: _id },
    );

    const data = { name, ingredients, preparation, userId: _id, _id: insertedRecipe.insertedId };
    return data;
  } catch (e) {
    console.log('insertRecipe MODEL', e);
  }
};

const editRecipeById = async (id, { name, ingredients, preparation }, token) => {
  try {
    const db = await connection();
    const decoded = jwt.decode(token);
    const { email } = decoded;

    const getUserId = await db.collection('users').findOne({ email });
    const { _id } = getUserId;

    await db.collection('recipes').updateOne(
      { _id: ObjectId(id) },
      { $set: { name, ingredients, preparation, userId: _id } },
      );

    const data = { _id, name, ingredients, preparation, userId: _id };
    return data;
  } catch (e) {
    console.log('editRecipeById MODEL', e);
  }
};

const deleteRecipeById = async (id) => {
  try {
    const db = await connection();
    await db.collection('recipes').deleteOne({ _id: ObjectId(id) });
  } catch (e) {
    console.log('deleteRecipeById MODEL', e);
  }
};

const getAllRecipes = async () => {
  try {
    const db = await connection();
    const result = await db.collection('recipes').find().toArray();

    return result;
  } catch (e) {
    console.log('getAllRecipes MODEL', e);
  }
};

const getRecipeById = async (id) => {
  try {
    const db = await connection();
    const result = await db.collection('recipes').findOne({ _id: ObjectId(id) });

    return result;
  } catch (e) {
    console.log('getRecipeById MODEL', e);
  }
};

const imageRecipe = async (id, path) => {
  try {
    const db = await connection();

    await db.collection('recipes').updateOne(
      { _id: ObjectId(id) },
      { $set: { image: path } },
    );

    const result = await db.collection('recipes').findOne({ _id: ObjectId(id) });
    return result;
  } catch (e) {
    console.log('imageRecipe MODEL', e);
  }
};

module.exports = {
  insertRecipe,
  getAllRecipes,
  getRecipeById,
  editRecipeById,
  deleteRecipeById,
  imageRecipe,
};
