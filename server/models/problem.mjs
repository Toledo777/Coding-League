import mongoose from "mongoose";

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

export var problem = mongoose.model("problem", problemSchema);

