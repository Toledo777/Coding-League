import mongoose, { mongo } from "mongoose";

const testSchema = mongoose.Schema({
	user: String,
	comment: String,
});

const userSchema = mongoose.Schema({

})

const questionSchema = mongoose.Schema({
    email: String,
    username: String,


})

export var testModel = mongoose.model("testObj", testSchema);