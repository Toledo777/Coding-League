// import Runner from "./runner.ts";
// const TASK_COUNT = 512;

import { attemptProblem } from "./problem_test_runner.ts";
import { Problem } from "./types/problem.d.ts";

const exampleProblem: Problem = JSON.parse(Deno.readTextFileSync("../../"));

const code = Deno.readTextFileSync("code.js");
console.table((await attemptProblem(code, exampleProblem)).test_results);
