"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TotpRequiredError extends Error {
    constructor(challengeName, challengeParameters) {
        super("Totp required");
        this.challengeName = challengeName;
        this.challengeParameters = challengeParameters;
    }
}
exports.TotpRequiredError = TotpRequiredError;
