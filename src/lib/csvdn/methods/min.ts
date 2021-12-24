import { CSVDN } from "../../csvdn";

export function min(this: CSVDN, col: number) {
  return this.min_[col]
}