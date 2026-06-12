const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  recipe: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

reviewSchema.post('save', async function () {
  const Recipe = mongoose.model('Recipe');
  const result = await mongoose.model('Review').aggregate([
    { $match: { recipe: this.recipe } },
    { $group: { _id: '$recipe', avg: { $avg: '$rating' }, count: { $sum: 1 } } }
  ]);
  if (result.length > 0) {
    await Recipe.findByIdAndUpdate(this.recipe, {
      averageRating: Math.round(result[0].avg * 10) / 10,
      reviewCount: result[0].count
    });
  }
});

module.exports = mongoose.model('Review', reviewSchema);
