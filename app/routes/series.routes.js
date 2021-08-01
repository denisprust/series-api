var express = require('express');
var router = express.Router();

const series = require('../controllers/series.controller.js');

// Create a new series
router.post('/series', series.create);

// Retrieve all series
router.get('/series', series.findAll);

// Retrieve a single Note with seriesId
router.get('/series/:seriesId', series.findOne);

// Update a Note with seriesId
router.put('/series/:seriesId', series.update);

// Delete a Note with seriesId
router.delete('/series/:seriesId', series.delete);

module.exports = router;
