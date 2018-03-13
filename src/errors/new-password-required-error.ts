export class NewPasswordRequiredError extends Error {
  constructor(public userAttributes: any, public requiredAttributes: any) {
    super("New password required");
  }
}
