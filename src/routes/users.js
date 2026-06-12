const router = require('express').Router();
const { getUserById, getSavedRecipes, saveRecipe } = require('../controllers/userController');

router.get('/:id', getUserById);
router.get('/:id/saved', getSavedRecipes);
router.post('/:id/saved/:recipeId', saveRecipe);

module.exports = router;
