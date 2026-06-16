const Review = require('../models/Review');

const getReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ recipe: req.params.id })
      .populate('user', 'name avatarUrl')
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    next(err);
  }
};

const createReview = async (req, res, next) => {
  try {
    const review = await Review.create({
      recipe: req.params.id,
      user: req.body.user,
      rating: req.body.rating,
      comment: req.body.comment
    });
    await review.populate('user', 'name avatarUrl');
    res.status(201).json(review);
  } catch (err) {
    next(err);
  }
};

module.exports = { getReviews, createReview };
