"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AuthenticationDetailsWrapper {
    constructor(data) {
        const { ValidationData, Username, Password, AuthParameters } = data || {};
        this.validationData = ValidationData || {};
        this.authParameters = AuthParameters || {};
        this.username = Username;
        this.password = Password;
    }
    /**
     * @returns {string} the record's username
     */
    getUsername() {
        return this.username;
    }
    /**
     * @returns {string} the record's password
     */
    getPassword() {
        return this.password;
    }
    /**
     * @returns {Array} the record's validationData
     */
    getValidationData() {
        return this.validationData;
    }
    /**
     * @returns {Array} the record's authParameters
     */
    getAuthParameters() {
        return this.authParameters;
    }
}
exports.default = AuthenticationDetailsWrapper;
