"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MfaRequiredError extends Error {
    constructor(challengeName, challengeParameters) {
        super("MFA required");
        this.challengeName = challengeName;
        this.challengeParameters = challengeParameters;
    }
}
exports.MfaRequiredError = MfaRequiredError;
