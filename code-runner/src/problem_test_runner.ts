import { allocateProblemTestProcessFiles, TestRunnerFiles } from "./problem_test_allocator.ts";
import { Problem, TestCase } from "./types/problem.d.ts";

type TestRunResult = {
    ok: boolean,
    stdout: string,
    stderr: string
    solution: string,
}

type ProblemAttemptResult = {
    all_ok: boolean,
    total_ran: number,
    failures: number,
    test_results: TestRunResult[],
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


async function runTestCase(code: string, { input, output: expected_out }: TestCase): Promise<TestRunResult> {
    const files = await allocateProblemTestProcessFiles();
    const postfix = createTestingPostfix(input, files.solution_out);

    const process = await createProcess(code + postfix, files);

    // Wait until status is received before reading output files.
    const status = await process.status();

    const [stdout, stderr, solution] = ([
        await Deno.readTextFile(files.debug_out),
        await Deno.readTextFile(files.error_out),
        await Deno.readTextFile(files.solution_out),
    ]);


    // TODO: Validate that this replacement is valid for all tests.
    const ok = status.success && solution == expected_out.replaceAll("\n", "");

    return { ok, stderr, stdout, solution };
}

export async function attemptProblem(code: string, problem: Problem): Promise<ProblemAttemptResult> {
    const test_results: TestRunResult[] = [];

    for (const test of problem.testcases) {
        test_results.push(await runTestCase(code, test));
    }

    const failures = test_results.filter(res => !res.ok).length;
    const all_ok = failures == 0;
    const total_ran = test_results.length;

    return { all_ok, total_ran, failures, test_results };
}