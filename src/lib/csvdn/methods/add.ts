
import { CSVDN } from "../../csvdn";

export function add(this: CSVDN, key: string, opts: any) {
  this.rules[key] = opts;
}
