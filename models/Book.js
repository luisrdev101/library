const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
	id: {
		type: String,
		required: [ true, 'Please add a unique id' ],
		unique: true
	},
	title: {
		type: String,
		required: [ true, 'Please add a book title' ]
	},
	author: {
		type: String,
		required: [ true, 'Please add a book title' ]
	},
	year: {
		type: Number,
		required: [ true, 'Please add a book year' ]
	},
	edition: {
		type: String,
		required: [ true, 'Please add a book edition' ]
	},
	quantity: {
		type: Number,
		required: [ true, 'Please add a number of books' ]
	}
});

module.exports = mongoose.models.Book || mongoose.model('Book', BookSchema);
