const router = require('express').Router();

const {
  verifTokenJwt,
} = require('../utils/jwt');

const {
  verifyName,
  verifyIngredients,
  verifyPreparation,
  verifyId,
  validateToken,
  verifyTokenIntegrity,
  findId,
} = require('../middlewares/recipesMiddlewares');

const {
  insertRecipe,
  getAllRecipes,
  getRecipeById,
  editRecipeById,
  deleteRecipeById,
  imageRecipe,
} = require('../controllers/recipesControllers');

const upload = require('../utils/multer');

router.post('/', verifTokenJwt, verifyName, verifyIngredients, verifyPreparation, insertRecipe);

router.get('/', getAllRecipes);

router.get('/:id', verifyId, getRecipeById);

router.put('/:id', validateToken, verifyTokenIntegrity, editRecipeById);

router.delete('/:id', validateToken, verifyTokenIntegrity, deleteRecipeById);

router.put('/:id/image',
  verifyTokenIntegrity,
  validateToken,
  findId,
  upload.single('image'),
  imageRecipe);

module.exports = router;
