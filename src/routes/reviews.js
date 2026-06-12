const router = require('express').Router();
const { getReviews, createReview } = require('../controllers/reviewController');

router.get('/:id/reviews', getReviews);
router.post('/:id/reviews', createReview);

module.exports = router;
