type HTML = string;

type TestCase = { input: string, output: string };

export type Problem = {
  id: string,
  url: string,
  title: string,
  // in seconds
  time_limit: number,
  // in megabytes
  memory_limit: number,
  description: HTML,
  input_specification: HTML,
  output_specification: HTML,
  note?: HTML,
  sample_tests: HTML,
  testcases: TestCase[],
  tags: string[],
}
