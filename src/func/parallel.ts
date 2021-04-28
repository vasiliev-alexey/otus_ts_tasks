export class Parallel {
  constructor(private threadCount: number) {}

  async jobs(...func: Function[]): Promise<number[]> {
    let res: number[] = [];

    let thread = async (prom: Function): Promise<number[]> => {
      const data = await prom();
      res.push(data);

      const job = func.shift();

      if (job) {
        await thread(job);
      }
      return res;
    };

    let pr: Promise<number[]>[] = [];

    for (let i = 0; i < this.threadCount; i++) {
      const jobFunc = func.shift();
      if (jobFunc) {
        pr.push(thread(jobFunc));
      }
    }
    await Promise.all(pr);
    return res;
  }
}
