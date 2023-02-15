import mongoose, { mongo } from "mongoose";

// test case object used in problemSchema
const testCase = { input: String, output: String };

// schema for a coding problem
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

const userAnswer = {
    email: String,
    problem_id: String,
    user_answer: String,
    pass_test: Boolean,
    points: Number,
}

const user = {
    email: String,
    username: String,
    avatar_uri: String,
    wins: Number,
    loss: Number,
    rank: String
}


export var problem = mongoose.model("problem", problemSchema);





