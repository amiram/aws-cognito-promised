"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CustomChallengeError extends Error {
    constructor(challengeParameters) {
        super("Custom challenge");
        this.challengeParameters = challengeParameters;
    }
}
exports.CustomChallengeError = CustomChallengeError;
//# sourceMappingURL=custom-challenge-error.js.map