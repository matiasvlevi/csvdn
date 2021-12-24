import { CSVDN } from "../../csvdn";

export function registerOperation(name: string, operation: any) {
  CSVDN.customOperations[name] = operation;
}