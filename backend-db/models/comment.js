const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    game: { type: String, required: true },
    author: { type: String, required: true },
	comment: { type: String, required: true}
});

module.exports = mongoose.model('Comment', productSchema);