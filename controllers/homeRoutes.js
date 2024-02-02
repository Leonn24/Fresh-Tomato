const router = require('express').Router();
const { Movie, Review, User } = require('../models');
const withAuth = require('../utils/auth')

app.get('/example', (req, res) => {
    // Render the 'example' view
    res.render('example', { data: 'Some data to pass to the view' });
});