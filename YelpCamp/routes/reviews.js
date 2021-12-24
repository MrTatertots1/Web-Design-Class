const express = require('express')
const router = express.Router({ mergeParams: true })

// Require Utils
const catchAsync = require('../utils/catchAsync')
const ExpressError = require('../utils/ExpressErrors')

// Require Models
const Review = require('../models/review');
const Campground = require('../models/campground');

// Require Schemas
const { reviewSchema } = require('../schemas')

const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body)
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else { next() }
}

// Start Routes
router.post('/', validateReview, catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id)
    const review = new Review(req.body.review)
    campground.reviews.push(review)
    await review.save()
    await campground.save()
    req.flash('success', 'Review posted!')
    res.redirect(`/campgrounds/${campground.id}`)
}))

router.delete('/:reviewId', catchAsync(async (req, res) => {
    const { id, reviewId } = req.params
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } })
    await Review.findByIdAndDelete(reviewId)
    req.flash('success', 'Review deleted!')
    res.redirect(`/campgrounds/${id}`)
}))

module.exports = router