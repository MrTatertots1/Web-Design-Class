const express = require('express');
const passport = require('passport');
const router = express.Router();

// Require Utils
const catchAsync = require('../utils/catchAsync');

// Require Controllers
const users = require('../controllers/users');

router.route('/register')
    .get(users.renderRegister)
    .post(catchAsync(users.createUser));

router.route('/login')
    .get(users.renderLogin)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.login);

router.get('/logout', users.logout);

module.exports = router;