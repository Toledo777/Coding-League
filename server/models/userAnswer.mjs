import mongoose from 'mongoose';

const userAnswerSchema = {
	email: String,
	problem_id: String,
	problem_title: String,
	submission: String,
	pass_test: Boolean,
};

export var userAnswer = mongoose.model('userAnswer', userAnswerSchema);