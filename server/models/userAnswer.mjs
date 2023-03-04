import mongoose from 'mongoose';
import cachegoose from 'recachegoose';

cachegoose(mongoose, {
	engine: 'memory'
});

const userAnswerSchema = {
	email: String,
	problem_id: String,
	user_answer: String,
	pass_test: Boolean,
	points: Number,
};

export var userAnswer = mongoose.model('userAnswer', userAnswerSchema);