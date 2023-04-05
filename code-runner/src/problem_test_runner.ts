import { allocateProblemTestProcessFiles, TestRunnerFiles } from "./problem_test_allocator.ts";
import { readTextFileWithLimit } from "./safe_reader.ts";
import { Problem, TestCase } from "./types/problem.d.ts";

const BUFFER_SIZE = 4096 * 4 // 16kb

type TestRunResult = {
    ok: boolean,
    stdout: string,
    stderr: string,
    answer: string,
    expected: string,
}

export type ProblemDebugResult = {
    all_ok: boolean,
    total_ran: number,
    failures: number,
    individual_tests: TestRunResult[],
};


export type ProblemAttemptResult = Omit<ProblemDebugResult, "individual_tests">;


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
        readTextFileWithLimit(files.debug_out, BUFFER_SIZE),
        readTextFileWithLimit(files.error_out, BUFFER_SIZE),
        readTextFileWithLimit(files.solution_out, BUFFER_SIZE),
    ]);


    const expected = expected_output.replaceAll("\n", "");
    const ok = status.success && (answer == expected || answer.replaceAll('"', '') == expected);

    return { ok, stderr, stdout, answer, expected: expected_output };
}

function processAttemptResults(results: TestRunResult[]): ProblemAttemptResult {
    const failures = results.filter(res => !res.ok).length;

    return {
        failures,
        all_ok: failures == 0,
        total_ran: results.length,
    }
}

function processDebugResults(results: TestRunResult[]): ProblemDebugResult {
    const failures = results.filter(res => !res.ok).length;

    return {
        failures,
        all_ok: failures == 0,
        total_ran: results.length,
        individual_tests: results,
    }
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
    return processAttemptResults(results);
}

export async function debugProblem(code: string, problem: Problem): Promise<ProblemDebugResult> {
    const tests = problem.testCases.slice(0, 5);
    const results = await runTestCases(code, tests, true);
    return processDebugResults(results);
}