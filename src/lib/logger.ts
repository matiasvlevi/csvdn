const Space = 4;
export class Logger {
  constructor() {/* No instance */ }
  public static error(msg: string) {
    console.log(`\x1b[31m CSVDN ERROR: ${msg}\x1b[0m`)
  }
  public static warn(msg: string) {
    console.log(`\x1b[33m CSVDN WARNING: ${msg}\x1b[0m`)
  }
  public static log(msg: string) {
    console.log(`${msg}`)
  }
  public static findLargestString(msg: any[][]) {
    let columnSpaces: number[] = [];
    let pad: number = Space;
    for (let i = 0; i < msg[0].length; i++) {
      let record: number = 0;
      for (let j = 0; j < msg.length; j++) {
        let len: number = (`${msg[j][i]}`).length;
        if (len > record) {
          record = len;
        }
      }
      columnSpaces.push(pad + record);
    }
    return columnSpaces;
  }
} 