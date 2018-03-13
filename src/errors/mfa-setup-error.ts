export class MfaSetupError extends Error {
  constructor(public challengeName: any, public challengeParameters: any) {
    super("MFA setup");
  }
}
