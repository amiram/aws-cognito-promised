"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NewPasswordRequiredError extends Error {
    constructor(userAttributes, requiredAttributes) {
        super("New password required");
        this.userAttributes = userAttributes;
        this.requiredAttributes = requiredAttributes;
    }
}
exports.NewPasswordRequiredError = NewPasswordRequiredError;
//# sourceMappingURL=new-password-required-error.js.map