import { CSVDN } from "../../csvdn";

export function max(this: CSVDN, col: number) {
  return this.max_[col];
}