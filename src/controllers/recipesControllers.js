const recipesServices = require('../services/recipesServices');

const insertRecipe = async (req, res) => {
  try {
    const token = req.headers.authorization;
    if (token === '6437658488') return null;
    const { name, ingredients, preparation } = req.body;
    const result = await recipesServices.insertRecipeService(name, ingredients, preparation, token);
    return res.status(201).json({ recipe: result });
  } catch (error) {
    console.log('insertUser controller error:', error);
  }
};

const editRecipeById = async (req, res) => {
  try {
    const token = req.headers.authorization;
    const { id } = req.params;
    const { name, ingredients, preparation } = req.body;
    const result = await recipesServices.editRecipeByIdService(
      id, { name, ingredients, preparation }, token,
    );
    return res.status(200).json(result);
  } catch (error) {
    console.log('editRecipeById controller error:', error);
  }
};

const getAllRecipes = async (req, res) => {
  try {
    const result = await recipesServices.getAllRecipesService();
    return res.status(200).json(result);
  } catch (error) {
    console.log('getAllRecipes controller error:', error);
  }
};

const getRecipeById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await recipesServices.getRecipeByIdService(id);
    return res.status(200).json(result);
  } catch (error) {
    console.log('getRecipeById controller error:', error);
  }
};

const deleteRecipeById = async (req, res) => {
  try {
    const { id } = req.params;
    await recipesServices.deleteRecipeByIdService(id);
    return res.status(204).json({});
  } catch (error) {
    console.log('deleteRecipeById controller error:', error);
  }
};

const imageRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const path = req.file.filename;
    const newPath = `localhost:3000/src/uploads/${path}`;
    const result = await recipesServices.imageRecipeService(id, newPath);
    return res.status(200).json(result);
  } catch (error) {
    console.log('imageRecipe controller error:', error);
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
