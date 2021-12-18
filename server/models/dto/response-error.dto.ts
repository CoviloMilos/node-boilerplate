export class ResponseError implements Error {
  public name: string;
  public message: string;
  public code: number | undefined;
  public stack?: string | undefined;
  public validationErrors?: { property: string; message: string }[] | undefined;
  constructor(name: string, message: string, code?: number, stack?: string, validationErrors?: { property: string; message: string }[]) {
    this.name = name;
    this.message = message;
    this.code = code;
    this.stack = stack;
    this.validationErrors = validationErrors;
  }
}
