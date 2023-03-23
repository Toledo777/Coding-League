import mongoose from 'mongoose';

const userAnswerSchema = {
	email: String,
	problem_id: String,
	pass_test: Boolean,
	submission: String,
	
};

export var userAnswer = mongoose.model('userAnswer', userAnswerSchema);