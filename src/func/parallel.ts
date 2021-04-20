export class Parallel {
  constructor(private threadCount: number) {}

  // jobs( ...arr :   Function [] ) : Promise<number> {
  async jobs(...arr: Promise<number>[]): Promise<number> {
    for (let i = 0; i < arr.length; i++) {
      let r = await arr[i]();
      //let r1 = r();

      console.log(r);
    }

    return Promise.resolve(-1);
  }
}
