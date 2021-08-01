const Series = require('../models/series.model.js');

const base64Img = require('base64-img');

// Create and Save a new Series
exports.create = (req, res) => {
    console.log(req.body)
    // Validate request
    if(!req.body.name || !req.body.year || !req.body.seasons || !req.body.category) {
        return res.status(400).send({
            message: "Series data can not be empty"
        });
    }

    // Create a Series
    const series = new Series({
        name: req.body.name, 
        year: req.body.year,
        seasons: req.body.seasons,
        synopsis: req.body.synopsis,
        category: req.body.category,
        situation: req.body.situation
    });

    // Save Series in the database
    series.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Series."
        });
    });
};

// Retrieve and return all Seriess from the database.
exports.findAll = (req, res) => {
    Series.find()
    .then(series => {
        res.json(series);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving series."
        });
    });
};

// Find a single Series with a SeriesId
exports.findOne = (req, res) => {
    Series.findById(req.params.seriesId)
    .then(series => {
        if(!series) {
            return res.status(404).send({
                message: "Series not found with id " + req.params.seriesId
            });            
        }
        res.send(series);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Series not found with id " + req.params.seriesId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving series with id " + req.params.seriesId
        });
    });
};

// Update a Series identified by the SeriesId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.name || !req.body.year || !req.body.seasons || !req.body.category) {
        return res.status(400).send({
            message: "Series data can not be empty"
        });
    }

    // Find series and update it with the request body
    Series.findByIdAndUpdate(req.params.seriesId, {
        name: req.body.name, 
        year: req.body.year,
        seasons: req.body.seasons,
        synopsis: req.body.synopsis,
        category: req.body.category,
        situation: req.body.situation
    }, {new: true})
    .then(series => {
        if(!series) {
            return res.status(404).send({
                message: "Series not found with id " + req.params.seriesId
            });
        }
        res.send(series);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Series not found with id " + req.params.seriesId
            });                
        }
        return res.status(500).send({
            message: "Error updating series with id " + req.params.seriesId
        });
    });
};

// Delete a Series with the specified SeriesId in the request
exports.delete = (req, res) => {
    Series.findByIdAndRemove(req.params.seriesId)
    .then(series => {
        if(!series) {
            return res.status(404).send({
                message: "Series not found with id " + req.params.seriesId
            });
        }
        res.send({message: "Series deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Series not found with id " + req.params.seriesId
            });                
        }
        return res.status(500).send({
            message: "Could not delete series with id " + req.params.seriesId
        });
    });
};