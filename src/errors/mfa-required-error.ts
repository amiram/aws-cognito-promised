export class MfaRequiredError extends Error {
  constructor(public challengeName: any, public challengeParameters: any) {
    super("MFA required");
  }
}
