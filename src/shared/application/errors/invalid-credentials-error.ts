export class InvalidCredentialsError extends Error {
  constructor(public message: string = 'Invalid credentials') {
    super(message);
    this.name = 'InvalidCredentialsError';
  }
}
