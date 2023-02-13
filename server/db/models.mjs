import mongoose, { mongo } from "mongoose";

const testSchema = mongoose.Schema({
	user: String,
	comment: String,
});

export var testModel = mongoose.Model(testSchema, "testObj");