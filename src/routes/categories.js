const router = require('express').Router();
const { getCategories } = require('../controllers/recipeController');

router.get('/', getCategories);

module.exports = router;
