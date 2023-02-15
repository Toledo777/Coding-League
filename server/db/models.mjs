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
  // this field could be missing if it is null
  note: String,
  sample_tests: String,
  test_cases: [testCase],
  tags: [String],
}


export var problem = mongoose.model("problem", problemSchema);





