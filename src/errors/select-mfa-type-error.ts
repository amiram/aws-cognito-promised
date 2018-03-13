export class SelectMfaTypeError extends Error {
  constructor(public challengeName: any, public challengeParameters: any) {
    super("Select MFA type");
  }
}
