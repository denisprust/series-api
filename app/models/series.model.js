const mongoose = require('mongoose');

const SeriesSchema = mongoose.Schema({
    name: String,
    year: Number,
    seasons: Number,
    synopsis: String,
    category: String,
    situation: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Series', SeriesSchema);