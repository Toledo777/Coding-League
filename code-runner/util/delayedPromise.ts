export class DelayedPromise<T> {
  public promise: Promise<T>;
  public res!: (value: T | PromiseLike<T>) => void;
  public rej!: (value: unknown) => void;

  constructor() {
    this.promise = new Promise((_res, _rej) =>
      [this.res, this.rej] = [_res, _rej]
    );
  }
}
