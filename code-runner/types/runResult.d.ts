type RunStatus = "Success" | `Failure: ${Failure}`;
type Failure = "timeout" | "syntax" | "runtime" | `test case`;

type RunResult = {
    ok: boolean,
    status: RunStatus,
    statusMessage: string | null,
    stdout: string,
}