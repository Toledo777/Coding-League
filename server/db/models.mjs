import mongoose, { mongo } from "mongoose";

// const testSchema = mongoose.Schema({
// 	user: String,
// 	comment: String,
// });

// const userSchema = mongoose.Schema({

// })


const testCase = { input: String, output: String };

const problemSchema = {
  id: String,
  url: String,
  title: String,
  // in seconds
  time_limit: Number,
  // in megabytes
  memory_limit: Number,
  description: String,
  input_specification: String,
  output_specification: String,
  note?: String,
  sample_tests: String,
  testcases: [testCase],
  tags: [String],
}



export var testModel = mongoose.model("problem", problemSchema);