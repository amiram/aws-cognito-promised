"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SelectMfaTypeError extends Error {
    constructor(challengeName, challengeParameters) {
        super("Select MFA type");
        this.challengeName = challengeName;
        this.challengeParameters = challengeParameters;
    }
}
exports.SelectMfaTypeError = SelectMfaTypeError;
//# sourceMappingURL=select-mfa-type-error.js.map