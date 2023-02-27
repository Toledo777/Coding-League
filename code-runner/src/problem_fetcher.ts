import { Problem } from "./types/problem.d.ts";
// TODO: Change API_URL based on environnement

const API_URL = "https://codingleague.azurewebsites.net/";
// const API_URL = "http://localhost:8080";

export default async function fetchProblemById(id: string): Promise<Problem> {
    const res = await fetch(`${API_URL}/api/problem/id?id=${id}`);
    if (res.ok) {
        const problem = await res.json();
        return problem;
    } else {
        throw new Error(res.statusText)
    }
}
