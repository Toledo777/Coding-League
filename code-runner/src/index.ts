import { serve } from "https://deno.land/std@0.114.0/http/server.ts";
import { router, MatchHandler } from "https://crux.land/router@0.0.5";
import { attemptProblem, debugProblem, ProblemAttemptResult, ProblemDebugResult } from "./problem_test_runner.ts";
import fetchProblemById from "./problem_fetcher.ts";

type TestAttemptRequest = {
	problem_id: string,
	code: string,
}

async function handleTestAttemptRequest(request: TestAttemptRequest, debug: boolean):
	Promise<ProblemDebugResult | ProblemAttemptResult> {
	const problem_data = await fetchProblemById(request.problem_id);
	if (debug) {
		return await debugProblem(request.code, problem_data);
	} else {
		return await attemptProblem(request.code, problem_data);
	}
}

const routes: Record<string, MatchHandler> = {
	"POST@/debug_problem": async (req) => {
		return Response.json(await handleTestAttemptRequest(await req.json(), true));
	},
	"POST@/attempt_problem": async (req) => {
		return Response.json(await handleTestAttemptRequest(await req.json(), false));
	},
}

console.log("Listening!");

await serve(router(routes), { addr: ":8000" });