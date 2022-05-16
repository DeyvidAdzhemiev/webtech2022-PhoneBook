const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    firstName: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		match: [/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, 'Invalid email']
	},
	phone: {
        type: String,
        required: true,
    }
});

const User = mongoose.model("User", UserSchema);

module.exports = User; 