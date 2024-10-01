export class ConflictError extends Error {
  constructor(public message: string = 'A conflict occurred') {
    super(message);
    this.name = 'ConflictError';
  }
}
