const express = require('express');
const router = express.Router();

// Require Utils
const catchAsync = require('../utils/catchAsync');

// Require Middleware
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware');

// Require Controllers
const campgrounds = require('../controllers/campgrounds');

// Start Routes
router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn, validateCampground, catchAsync(campgrounds.createCampground));

router.get('/new', isLoggedIn, campgrounds.renderNew);

router.route('/:id')
    .get(catchAsync(campgrounds.showCampground))
    .put(isLoggedIn, isAuthor, validateCampground, catchAsync(campgrounds.updateCampground))
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEdit));

module.exports = router;