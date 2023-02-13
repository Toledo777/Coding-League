import * as mod from "https://deno.land/std@0.175.0/streams/mod.ts";
import { readLines } from "https://deno.land/std@0.100.0/io/mod.ts";

const encoder = new TextEncoder();
export default async function sandboxedProc(code: string): Promise<[Deno.Process, number]> {
  const p = Deno.run({
    cmd: ["deno", "run", "--allow-hrtime", "--no-check", "-"],
    stdout: "piped",
    stdin: "piped",
    stderr: "piped",
  });

  await mod.writeAll(p.stdin!, encoder.encode(
    'console.log("START");' + 
    code));
  p.stdin.close();

  // deno-lint-ignore no-async-promise-executor
  return new Promise(async (res, rej) => {
    const tm = setTimeout(() => rej("TOOK TOO LONG"), 2000);
    for await (const _ of readLines(p.stdout)) {
      clearTimeout(tm);
      const start = performance.now();
      res([p, start]);
      return 
    }
  });
}
  