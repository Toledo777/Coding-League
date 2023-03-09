import { allocateProblemTestProcessFiles, TestRunnerFiles } from "./problem_test_allocator.ts";
import { readTextFileWithLimit } from "./safe_reader.ts";
import { Problem, TestCase } from "./types/problem.d.ts";

type TestResult = {
    ok: boolean,
    stdout: string,
    stderr: string,
    answer: string,
    expected: string,
}

type ProblemTestResult = {
    all_ok: boolean,
    total_ran: number,
    failures: number,
    runtime: number,
}

type ProblemDebugResult = ProblemTestResult & {
    individual_tests: TestResult[],
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


async function runTestCase(code: string, { input, output: expected }: TestCase, timeout = 2000): Promise<TestResult> {
    const files = await allocateProblemTestProcessFiles();
    const postfix = createTestingPostfix(input, files.solution_out);
    const process = await createProcess(code + postfix, files);

    // Make sure the process is killed if it takes too long
    const kill_timeout = setTimeout(() => process.kill(), timeout);

    // Wait until status is received before reading output files.
    const status = await process.status();

    clearTimeout(kill_timeout);

    const [stdout, stderr, answer] = ([
        await readTextFileWithLimit(files.debug_out, 2048),
        await readTextFileWithLimit(files.error_out, 2048),
        await readTextFileWithLimit(files.solution_out, 2048),
    ]);

    // TODO: Validate that this replacement is valid for all tests.
    const ok = status.success && answer == expected.replaceAll("\n", "");

    return { ok, stderr, stdout, answer, expected };
}

function processTestResults(tests: TestResult[], runtime: number, debug: true): ProblemDebugResult
function processTestResults(tests: TestResult[], runtime: number, debug: false): ProblemTestResult
function processTestResults(tests: TestResult[], runtime: number, debug: boolean) {
    const failures = tests.filter(res => !res.ok).length;

    const results: ProblemTestResult = {
        failures,
        all_ok: failures == 0,
        total_ran: tests.length,
        runtime
    };

    if (debug) {
        (results as ProblemDebugResult).individual_tests = tests;
    }

    return results;
}

async function time<T>(fn: () => Promise<T>): Promise<[T, number]> {
    const start = performance.now();
    const res = await fn()
    const end = performance.now();
    return [res, end - start];
}


export async function debugProblem(code: string, problem: Problem): Promise<ProblemDebugResult> {
    const tests = problem.testCases.slice(0, 5).map(test => runTestCase(code, test));
    const [results, runtime] = await time(() => Promise.all(tests));
    return processTestResults(results, runtime, true);
}

export async function attemptProblem(code: string, problem: Problem): Promise<ProblemTestResult> {
    const tests = problem.testCases.map(test => runTestCase(code, test));
    const [results, runtime] = await time(() => Promise.all(tests));
    return processTestResults(results, runtime, false);
}

