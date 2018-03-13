export class TotpRequiredError extends Error {
  constructor(public challengeName: any, public challengeParameters: any) {
    super("Totp required");
  }
}
