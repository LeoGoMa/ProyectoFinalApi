const Recipe = require('../models/Recipe');

const getRecipes = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const filter = {};
    if (req.query.category) filter.category = req.query.category;

    const [recipes, total] = await Promise.all([
      Recipe.find(filter).skip(skip).limit(limit).populate('author', 'name avatarUrl'),
      Recipe.countDocuments(filter)
    ]);

    res.json({
      data: recipes,
      page,
      totalPages: Math.ceil(total / limit),
      total
    });
  } catch (err) {
    next(err);
  }
};

const getRecipeById = async (req, res, next) => {
  try {
    const recipe = await Recipe.findById(req.params.id).populate('author', 'name avatarUrl bio');
    if (!recipe) return res.status(404).json({ error: 'Recipe not found' });
    res.json(recipe);
  } catch (err) {
    next(err);
  }
};

const searchRecipes = async (req, res, next) => {
  try {
    const q = req.query.q || '';
    const recipes = await Recipe.find({
      $or: [
        { name: { $regex: q, $options: 'i' } },
        { 'ingredients.name': { $regex: q, $options: 'i' } }
      ]
    }).populate('author', 'name avatarUrl');
    res.json(recipes);
  } catch (err) {
    next(err);
  }
};

const createRecipe = async (req, res, next) => {
  try {
    const recipe = await Recipe.create(req.body);
    res.status(201).json(recipe);
  } catch (err) {
    next(err);
  }
};

const getCategories = async (req, res, next) => {
  try {
    const categories = await Recipe.distinct('category');
    res.json(categories);
  } catch (err) {
    next(err);
  }
};

module.exports = { getRecipes, getRecipeById, searchRecipes, createRecipe, getCategories };
