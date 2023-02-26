import { Problem } from "./types/problem.d.ts";
const API_URL = "https://codingleague.azurewebsites.net";

export default async function fetchProblemById(id: string): Promise<Problem> {
    const res = await fetch(`${API_URL}/api/problem/id?id=${id}`);
    const problem = await res.json();
    return problem;
}
