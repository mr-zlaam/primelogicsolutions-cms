export function throwError(code: number, message: string) {
  throw { status: code, message };
}
