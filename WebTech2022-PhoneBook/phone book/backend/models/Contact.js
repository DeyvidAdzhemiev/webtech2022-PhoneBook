const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

	id: {
        type: String,
        required: true
    },
	firstName: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: true
	},
    address: {
        type: String,
        required: true
    },
	email: {
		type: String,
		required: true,
		match: [/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, 'Invalid email']
	},
	phone: {
        type: Array,
        required: true,
    },
    avatar: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Contacts", userSchema);