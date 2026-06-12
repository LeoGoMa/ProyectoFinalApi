const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  amount: { type: String, required: true }
}, { _id: false });

const recipeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  area: { type: String, default: '' },
  ingredients: { type: [ingredientSchema], required: true },
  instructions: { type: String, required: true },
  imageUrl: { type: String, default: '' },
  prepTime: { type: Number, default: 0 },
  difficulty: { type: String, enum: ['Fácil', 'Media', 'Difícil'], default: 'Fácil' },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  averageRating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Recipe', recipeSchema);
