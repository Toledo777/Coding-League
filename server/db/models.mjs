import mongoose from "mongoose";

const testSchema = mongoose.Schema({
	user: String,
	comment: String,
});

export var testModel = mongoose.model("testObj", testSchema);