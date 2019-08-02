const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
	{
		email: {
			type: String,
			lowercase: true,
			trim: true,
			index: true,
			unique: true,
			required: true
		},
		username: {
			type: String,
			lowercase: true,
			trim: true,
			index: true,
			unique: true,
			required: true
		},
		password: {
			type: String,
			required: true,
		},
		name: {
			type: String,
			trim: true,
			required: true
		},
		bio: {
			type: String,
			trim: true,
			default: ''
		},
		active: {
			type: Boolean,
			default: true
		},
		admin: {
			type: Boolean,
			default: false
		}
	},
	{ collection: 'users' }
);

UserSchema.index({ email: 1, username: 1 });

module.exports = mongoose.model('User', UserSchema, 'User');
