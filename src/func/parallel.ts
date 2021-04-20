export class Parallel {
  constructor(private threadCount: number) {}

  async jobs(...arr: Function[]): Promise<number[]> {
    const result : number[] = [];
    // async jobs(...arr: Promise<number>[]): Promise<number> {
    for (let i = 0; i < arr.length; i++) {
      let r = await arr[i]();
      //let r1 = r();
      result.push(r);
    //  console.log(r);
    }

    const r = Promise.all(arr.map(f => f())).then( (d) => {
      result.push(d);
    });

    return Promise.resolve(result);
  }
}
