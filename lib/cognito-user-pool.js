"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const amazon_cognito_identity_js_1 = require("amazon-cognito-identity-js");
const { promisify } = require("bluebird");
class CognitoUserPoolWrapper extends amazon_cognito_identity_js_1.CognitoUserPool {
    /**
     * Constructs a new CognitoUserPool object
     * @param {object} data Creation options.
     * @param {string} data.UserPoolId Cognito user pool id.
     * @param {string} data.ClientId User pool application client id.
     * @param {object} data.Storage Optional storage object.
     * @param {boolean} data.AdvancedSecurityDataCollectionFlag Optional:
     *        boolean flag indicating if the data collection is enabled
     *        to support cognito advanced security features. By default, this
     *        flag is set to true.
     */
    constructor(data) {
        super(data);
    }
    /**
     * @typedef {object} SignUpResult
     * @property {CognitoUser} user New user.
     * @property {bool} userConfirmed If the user is already confirmed.
     */
    /**
     * method for signing up a user
     * @param {string} username User's username.
     * @param {string} password Plain-text initial password entered by user.
     * @param {(AttributeArg[])=} userAttributes New user attributes.
     * @param {(AttributeArg[])=} validationData Application metadata.
     * @param {nodeCallback<SignUpResult>} callback Called on error or with the new user.
     * @returns {void}
     */
    signUp(username, password, userAttributes, validationData, callback) {
        if (callback) {
            super.signUp(username, password, userAttributes, validationData, callback);
            return;
        }
        return promisify(super.signUp)(username, password, userAttributes, validationData);
    }
}
exports.default = CognitoUserPoolWrapper;
