const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	id: {
		type: String,
		required: [ true, 'Please add a unique id' ],
		unique: true
	},
	name: {
		type: String,
		required: [ true, 'Please add a user name' ]
	},
	email: {
		type: String,
		required: [ true, 'Please add a email' ],
		unique: true
	}
});

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);
