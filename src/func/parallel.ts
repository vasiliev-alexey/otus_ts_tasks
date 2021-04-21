export class Parallel {
  constructor(private threadCount: number) {}

  async jobs(...arr: Function[]): Promise<number[]> {
    let begin = 0;
    let len = Math.ceil(arr.length / this.threadCount);
    const subarray = [];
    for (let i = 0; i < this.threadCount; i++) {
      subarray.push(arr.slice(begin, begin + len));
      begin = begin + len;
    }
    let result: number[] = [];
    // // @ts-ignore
    // await subarray.reduce(function compose(chain, chunk) {
    //   return chain.then(() => {
    //     const fired = chunk.map((job) => job());
    //     return Promise.all(fired).then((v) => result.push(...v));
    //   });
    // }, Promise.resolve());

    await Promise.all(
      subarray.map(async (tasks) => {
        const contents = await Promise.all(tasks.map((job) => job()));
        result.push(...contents);
      })
    );
    return Promise.resolve(result);
  }
}
