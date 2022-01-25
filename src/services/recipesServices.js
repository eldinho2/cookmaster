const recipesModel = require('../model/recipesModel');

const insertRecipeService = async (name, ingredients, preparation, token) => {
  try {
    const result = await recipesModel.insertRecipe(name, ingredients, preparation, token);
    return result;
  } catch (error) {
    console.log('insertRecipeService', error);
  }
};

const editRecipeByIdService = async (id, { name, ingredients, preparation }, token) => {
  try {
    const result = await recipesModel.editRecipeById(id, { name, ingredients, preparation }, token);
    return result;
  } catch (error) {
    console.log('editRecipeByIdService', error);
  }
};

const getAllRecipesService = async () => {
  try {
    const result = await recipesModel.getAllRecipes();
    return result;
  } catch (error) {
    console.log('getAllRecipesService', error);
  }
};

const getRecipeByIdService = async (id) => {
  try {
    const result = await recipesModel.getRecipeById(id);
    return result;
  } catch (error) {
    console.log('getRecipeByIdService', error.message);
  }
};

const deleteRecipeByIdService = async (id) => {
  try {
    await recipesModel.deleteRecipeById(id);
  } catch (error) {
    console.log('deleteRecipeByIdService', error);
  }
};

const imageRecipeService = async (id, path) => {
  try {
    const result = await recipesModel.imageRecipe(id, path);
    return result;
  } catch (error) {
    console.log('imageRecipeService', error);
  }
};

module.exports = {
  insertRecipeService,
  getAllRecipesService,
  getRecipeByIdService,
  editRecipeByIdService,
  deleteRecipeByIdService,
  imageRecipeService,
};
