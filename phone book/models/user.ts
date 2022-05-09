import { Schema, model } from 'mongoose';

export const userSchema = new Schema({
	id: Schema.Types.ObjectId,
	firstName: {
		type: Schema.Types.String,
		required: true
	},
	lastName: {
		type: Schema.Types.String,
		required: true
	},
	email: {
		type: Schema.Types.String,
		required: true,
		match: [/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, 'Invalid email']
	},
	phone: {
        type: Schema.Types.String,
        required: true,
    }
});

export const UserModel = model('User', userSchema);