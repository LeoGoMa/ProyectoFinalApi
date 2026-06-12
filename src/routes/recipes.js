const router = require('express').Router();
const {
  getRecipes,
  getRecipeById,
  searchRecipes,
  createRecipe
} = require('../controllers/recipeController');

router.get('/search', searchRecipes);
router.get('/', getRecipes);
router.get('/:id', getRecipeById);
router.post('/', createRecipe);

module.exports = router;
