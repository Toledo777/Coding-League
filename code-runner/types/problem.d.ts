type HTML = string;

type TestCase = { input: string, output: string };

type Problem = {
  id: string,
  url: string,
  title: string,
  time_limit_seconds: number,
  memory_limit_MB: number,
  description: HTML,
  input_specification: HTML,
  output_specification: HTML,
  note: HTML,
  test_cases: TestCase[],
  tags: string[],
}
