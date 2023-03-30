import { allocateProblemTestProcessFiles, TestRunnerFiles } from "./problem_test_allocator.ts";
import { readTextFileWithLimit } from "./safe_reader.ts";
import { Problem, TestCase } from "./types/problem.d.ts";

type TestRunResult = {
    ok: boolean,
    stdout: string,
    stderr: string,
    answer: string,
    expected: string,
}

export type ProblemDebugResult = {
    individual_tests: TestRunResult[],
} & ProblemAttemptResult;

export type ProblemAttemptResult = {
    all_ok: boolean,
    total_ran: number,
    failures: number,
}


function createTestingPostfix(test_input: string, result_file: string) {
    return `
    Deno.writeTextFileSync(\`${result_file}\`, JSON.stringify(solve(\`${test_input}\`)), {create:true});
    `
}

async function createProcess(code: string, files: TestRunnerFiles): Promise<Deno.Process> {
    const code_path = Deno.makeTempFileSync({ suffix: ".js", });
    Deno.writeTextFileSync(code_path, code);

    // Get the resource ID's of temporary files to pipe test output to
    const [stdout, stderr] = (
        await Promise.all([
            Deno.open(files.debug_out, { write: true, create: true }),
            Deno.open(files.error_out, { write: true, create: true })
        ])
    ).map(file => file.rid);

    // Run the process with the given RID's
    // "--no-check" disables type checking, this speeds up cold start execution time
    // We have to allow writing to the solution_out file, so that we can compare with expected results
    return Deno.run({
        cmd: ["deno", "run", "--no-check", `--allow-write=${files.solution_out}`, code_path],
        stdin: "piped",
        stdout,
        stderr,
    });
}


async function runTestCase(code: string, testCase: TestCase, timeout = 2000): Promise<TestRunResult> {
    const test_input = testCase.input;
    const expected_output = testCase.output;

    const files = await allocateProblemTestProcessFiles();
    const postfix = createTestingPostfix(test_input, files.solution_out);

    const process = await createProcess(code + postfix, files);

    // Make sure the process is killed if it takes too long
    const kill_timeout = setTimeout(() => process.kill(), timeout);

    // Wait until status is received before reading output files.
    const status = await process.status();

    clearTimeout(kill_timeout);

    const [stdout, stderr, answer] = await Promise.all([
        readTextFileWithLimit(files.debug_out, 2048),
        readTextFileWithLimit(files.error_out, 2048),
        readTextFileWithLimit(files.solution_out, 2048),
    ]);

    // TODO: Validate that this replacement is valid for all tests.
    const ok = status.success && answer == expected_output.replaceAll("\n", "");

    return { ok, stderr, stdout, answer, expected: expected_output };
}

function processTestResults(results: TestRunResult[], debug: true): ProblemDebugResult;
function processTestResults(results: TestRunResult[], debug: false): ProblemAttemptResult;
function processTestResults(results: TestRunResult[], debug: boolean): unknown {
    const failures = results.filter(res => !res.ok).length;

    const res: ProblemAttemptResult = {
        failures,
        all_ok: failures == 0,
        total_ran: results.length,
    };

    // Only add debug info if processed as debug
    return debug ? { ...res, individual_tests: results } : res;
}

async function runTestCases(code: string, tests: TestCase[], parallel = false): Promise<TestRunResult[]> {
    if (parallel) {
        return Promise.all(
            tests.map(test => runTestCase(code, test))
        );
    } else {
        const results: TestRunResult[] = [];
        for (const test of tests) {
            results.push(await runTestCase(code, test));
        }
        return results;
    }
}

export async function attemptProblem(code: string, problem: Problem): Promise<ProblemAttemptResult> {
    const tests = problem.testCases;
    const results = await runTestCases(code, tests);
    return processTestResults(results, false);
}

export async function debugProblem(code: string, problem: Problem): Promise<ProblemDebugResult> {
    const tests = problem.testCases.slice(0, 5);
    const results = await runTestCases(code, tests, true);
    return processTestResults(results, true);
}