import Runner from "./runner.ts";
const TASK_COUNT = 512;

const TASKS = [];
const threads = 16;

const runner = new Runner({ threads });

for (let i = 0; i < TASK_COUNT; i++) {
  TASKS.push(runner.enqueue({
    code: `
    let sum = 0;

    for(let i = 0; i < 100; i++) {
      sum+=i;
    }
    
    console.log(sum);
  `,
  }));
}

runner.fillPool();
const start = performance.now();
const results = await Promise.all(TASKS);
const end = performance.now();
results.sort((a, b) => a.runtime_ms - b.runtime_ms);

console.table({
  "tasks": TASK_COUNT,
  "threads": threads,
  "total": end - start,
  "max": results[results.length - 1].runtime_ms,
  "min": results[0].runtime_ms,
  "avg": results.reduce((p, v) => p + v.runtime_ms, 0) / TASK_COUNT,
});

console.table(results);
