const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    game: { type: String, required: true },
    player: { type: String, required: true },
	score: { type: Number, required: true}
});

module.exports = mongoose.model('Score', productSchema);