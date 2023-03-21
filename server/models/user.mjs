import mongoose from 'mongoose';

const userSchema = {
	email: String,
	username: String,
	avatar_uri: String,
	exp: Number,
	bio: String
};

export var user = mongoose.model('user', userSchema);
