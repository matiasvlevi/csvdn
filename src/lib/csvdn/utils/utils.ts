export class Utils {
  constructor() {/* No instace */ }
  public static findLargest(list: any[]) {
    let record: number = 0;
    for (let i = 0; i < list.length; i++) {
      if (+list[i] > record) {
        record = +list[i];
      }
    }
    return record;
  }
  public static findSmallest(list: any[]) {
    let record: number = Infinity;
    for (let i = 0; i < list.length; i++) {
      if (+list[i] < record) {
        record = +list[i];
      }
    }
    return record;
  }
  private map(
    v: number,
    a: number,
    b: number,
    c: number,
    d: number
  ) {
    return ((v - a) / (b - a)) * (d - c) + c;
  }
}