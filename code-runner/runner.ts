import { DelayedPromise } from "./util/delayedPromise.ts";
import sandboxedProc from "./util/sandboxedProc.ts";

interface Task {
  code: string;
}

interface QueueTask {
  promise: DelayedPromise<TaskRunResult>;
  task: Task;
}

interface TaskRunResult {
  runtime_ms: number;
  output: string;
  error: string;
  success:boolean;
  code:number;
}

function removeFrom<T>(arr: T[], item: T) {
  const index = arr.indexOf(item);
  if (index == -1) return;
  arr.splice(index, 1);
}

export interface RunnerOptions {
  timeout:number,
  threads:number,
}

export default class Runner {
  private timeout = 2000;
  private threads = 4;
  private decoder = new TextDecoder();

  private readonly queue: QueueTask[] = [];
  private readonly running: Promise<TaskRunResult>[] = [];

  private _onEmpty = () => {};

  public onEmpty(func:() => void) {
    this._onEmpty = func;
    return this;
  }

  constructor(opts:Partial<RunnerOptions> = {}) {
    Object.assign(this, opts);
  }

  public enqueue(task: Task) :Promise<TaskRunResult> {
    const promise = new DelayedPromise<TaskRunResult>();
    this.queue.push({ task, promise });
    return promise.promise;
  }

  public get poolSize() {
    return this.queue.length;
  }

  public get runningSize() {
    return this.running.length;
  }

  public fillPool() {
    if (this.running.length >= this.threads) return;
    if (this.queue.length < 1) return this._onEmpty();

    this.runNext();
    this.fillPool();
  }

  public async runNext(): Promise<TaskRunResult> {
    const task = this.queue.pop()!;

    this.running.push(task.promise.promise);

    const [p, start] = await sandboxedProc(task.task.code);
    const killTimeout = setTimeout(() => p.kill(), this.timeout);

    task.promise.promise.finally(() => {
      removeFrom(this.running, task.promise.promise);
    });

    const proms = [
      p.status(),
      p.output(),
      p.stderrOutput(),
    ] as const;

    Promise.all(proms).then(([status, rawOutput, err]) => {
      const end = performance.now();
      removeFrom(this.running, task.promise.promise);
      clearTimeout(killTimeout);

      const output = this.decoder.decode(rawOutput);
      const error = this.decoder.decode(err);
      
      const runtime_ms = end - start;

      task.promise.res({ ...status, output, error, runtime_ms });

      this.fillPool();
    });

    return task.promise.promise;
  }
}