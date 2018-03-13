"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MfaSetupError extends Error {
    constructor(challengeName, challengeParameters) {
        super("MFA setup");
        this.challengeName = challengeName;
        this.challengeParameters = challengeParameters;
    }
}
exports.MfaSetupError = MfaSetupError;
