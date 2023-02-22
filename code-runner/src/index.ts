import { serve } from "https://deno.land/std@0.114.0/http/server.ts";
import { router, MatchHandler } from "https://crux.land/router@0.0.5";
import { attemptProblem } from "./problem_test_runner.ts";
import fetchProblemById from "./problem_fetcher.ts";

type TestAttemptRequest = {
	problem_id: string,
	code: string,
}

const routes: Record<string, MatchHandler> = {
	"POST@/debug_problem": async (req) => {
		const { problem_id, code }: TestAttemptRequest = await req.json();
		const problem_data = await fetchProblemById(problem_id);
		const result = await attemptProblem(code, problem_data);
		return Response.json(result);
	},

	"POST@/attempt_problem": async (req) => {
		const { problem_id, code }: TestAttemptRequest = await req.json();
		const problem_data = await fetchProblemById(problem_id);
		const result = await attemptProblem(code, problem_data);
		return Response.json(result);
	},
	"/": (_req) => new Response("Hello World!", { status: 200 }),
}

console.log("Listening!");

await serve(router(routes), { addr: ":8000" });