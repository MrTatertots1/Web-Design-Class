const express = require('express');
const router = express.Router({ mergeParams: true });

// Require Utils
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressErrors');

// Require Models
const Review = require('../models/review');
const Campground = require('../models/campground');

// Require Middleware
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware');

// Start Routes
router.post('/', isLoggedIn, validateReview, catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    req.flash('success', 'Review posted!');
    res.redirect(`/campgrounds/${campground.id}`);
}));

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Review deleted!');
    res.redirect(`/campgrounds/${id}`);
}));

module.exports = router;