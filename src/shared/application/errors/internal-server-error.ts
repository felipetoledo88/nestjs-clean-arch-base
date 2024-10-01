export class InternalServerError extends Error {
  constructor(public message: string = 'A internal server error occurred') {
    super(message);
    this.name = 'InternalServerError';
  }
}
