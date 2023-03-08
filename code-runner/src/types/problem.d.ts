type HTML = string;

type TestCase = { input: string, output: string };

export type Problem = {
  _id: string,
  url: string,
  title: string,
  // in seconds
  time_limit: number,
  // in megabytes
  memoryLimit: number,
  description: HTML,
  inputSpecification: HTML,
  outputSpecification: HTML,
  note?: HTML,
  sampleTests: HTML,
  testCases: TestCase[],
  tags: string[],
}
