/// Creates files and processes to run tests

/// A testing process needs a few things,
/// - A file to write debug output to
/// - A file to write solution output to
/// - A file to write error output to

export type TestRunnerFiles = {
    working_dir: string,
    debug_out: string,
    error_out: string,
    solution_out: string,
}

export async function deallocateProblemTestProcessFiles({ working_dir }: TestRunnerFiles): Promise<void> {
    await Deno.remove(working_dir, { "recursive": true });
}

export async function allocateProblemTestProcessFiles(): Promise<TestRunnerFiles> {
    const working_dir = await Deno.makeTempDir();

    const debug_out = `${working_dir}/debug.out`;
    const error_out = `${working_dir}/error.out`;
    const solution_out = `${working_dir}/solution.out`;

    await Promise.all([
        Deno.writeTextFile(debug_out, "", { create: true }),
        Deno.writeTextFile(error_out, "", { create: true }),
        Deno.writeTextFile(solution_out, "", { create: true })
    ])

    return { working_dir, debug_out, error_out, solution_out };
}
