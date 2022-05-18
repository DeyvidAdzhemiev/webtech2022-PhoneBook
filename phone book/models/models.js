import { Schema, model } from "mongoose";

const UserSchema = new Schema({
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

const User = model("User", UserSchema);

export default User; 