export class Utils {
  constructor() {/* No instace */ }
  public static findLargest(list: any[]) {
    let record: number = 0;
    for (let i = 0; i < list.length; i++) {
      if (+list[i] > record) {
        record = list[i];
      }
    }
    return record;
  }
}