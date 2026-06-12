const User = require('../models/User');

const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    next(err);
  }
};

const getSavedRecipes = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
      .select('savedRecipes')
      .populate('savedRecipes');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user.savedRecipes);
  } catch (err) {
    next(err);
  }
};

const saveRecipe = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const alreadySaved = user.savedRecipes.includes(req.params.recipeId);
    if (!alreadySaved) {
      user.savedRecipes.push(req.params.recipeId);
      await user.save();
    }

    res.json({ message: 'Recipe saved', savedRecipes: user.savedRecipes });
  } catch (err) {
    next(err);
  }
};

module.exports = { getUserById, getSavedRecipes, saveRecipe };
