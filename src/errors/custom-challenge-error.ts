export class CustomChallengeError extends Error {
  constructor(public challengeParameters: any) {
    super("Custom challenge");
  }
}
