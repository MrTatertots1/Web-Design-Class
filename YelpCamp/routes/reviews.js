const express = require('express');
const router = express.Router({ mergeParams: true });

// Require Utils
const catchAsync = require('../utils/catchAsync');

// Require Middleware
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware');

// Require Controllers
const reviews = require('../controllers/reviews');

// Start Routes
router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview));
router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview));

module.exports = router;