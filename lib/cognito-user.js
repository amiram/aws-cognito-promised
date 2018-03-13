"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const amazon_cognito_identity_js_1 = require("amazon-cognito-identity-js");
const new_password_required_error_1 = require("./errors/new-password-required-error");
const mfa_required_error_1 = require("./errors/mfa-required-error");
const totp_required_error_1 = require("./errors/totp-required-error");
const custom_challenge_error_1 = require("./errors/custom-challenge-error");
const mfa_setup_error_1 = require("./errors/mfa-setup-error");
const select_mfa_type_error_1 = require("./errors/select-mfa-type-error");
const { promisify } = require("bluebird");
class CognitoUserWrapper extends amazon_cognito_identity_js_1.CognitoUser {
    /**
     * Constructs a new CognitoUser object
     * @param {object} data Creation options
     * @param {string} data.Username The user's username.
     * @param {CognitoUserPool} data.Pool Pool containing the user.
     * @param {object} data.Storage Optional storage object.
     */
    constructor(data) {
        super(data);
    }
    /**
     * This is used for authenticating the user.
     * stuff
     * @param {AuthenticationDetails} authDetails Contains the authentication data
     * @param {object} callback Result callback map.
     * @param {onFailure} callback.onFailure Called on any error.
     * @param {newPasswordRequired} callback.newPasswordRequired new
     *        password and any required attributes are required to continue
     * @param {mfaRequired} callback.mfaRequired MFA code
     *        required to continue.
     * @param {customChallenge} callback.customChallenge Custom challenge
     *        response required to continue.
     * @param {authSuccess} callback.onSuccess Called on success with the new session.
     * @returns {void}
     */
    authenticateUser(authDetails, callback) {
        if (callback) {
            super.authenticateUser(authDetails, callback);
            return;
        }
        return new Promise((resolve, reject) => {
            const cb = {
                onFailure: reject,
                onSuccess: (session, userConfirmationNecessary) => resolve({ session, userConfirmationNecessary }),
                newPasswordRequired: (userAttributes, requiredAttributes) => reject(new new_password_required_error_1.NewPasswordRequiredError(userAttributes, requiredAttributes)),
                mfaRequired: (challengeName, challengeParameters) => reject(new mfa_required_error_1.MfaRequiredError(challengeName, challengeParameters)),
                totpRequired: (challengeName, challengeParameters) => reject(new totp_required_error_1.TotpRequiredError(challengeName, challengeParameters)),
                customChallenge: challengeParameters => reject(new custom_challenge_error_1.CustomChallengeError(challengeParameters)),
                mfaSetup: (challengeName, challengeParameters) => reject(new mfa_setup_error_1.MfaSetupError(challengeName, challengeParameters)),
                selectMFAType: (challengeName, challengeParameters) => reject(new select_mfa_type_error_1.SelectMfaTypeError(challengeName, challengeParameters)),
            };
            super.authenticateUser(authDetails, cb);
        });
    }
    /**
     * This method is user to complete the NEW_PASSWORD_REQUIRED challenge.
     * Pass the new password with any new user attributes to be updated.
     * User attribute keys must be of format userAttributes.<attribute_name>.
     * @param {string} newPassword new password for this user
     * @param {object} requiredAttributeData map with values for all required attributes
     * @param {object} callback Result callback map.
     * @param {onFailure} callback.onFailure Called on any error.
     * @param {mfaRequired} callback.mfaRequired MFA code required to continue.
     * @param {customChallenge} callback.customChallenge Custom challenge
     *         response required to continue.
     * @param {authSuccess} callback.onSuccess Called on success with the new session.
     * @returns {void}
     */
    completeNewPasswordChallenge(newPassword, requiredAttributeData, callback) {
        if (callback) {
            super.completeNewPasswordChallenge(newPassword, requiredAttributeData, callback);
            return;
        }
        return new Promise((resolve, reject) => {
            const cb = {
                onFailure: reject,
                onSuccess: resolve,
                mfaRequired: (challengeName, challengeParameters) => reject(new mfa_required_error_1.MfaRequiredError(challengeName, challengeParameters)),
                customChallenge: challengeParameters => reject(new custom_challenge_error_1.CustomChallengeError(challengeParameters)),
            };
            super.completeNewPasswordChallenge(newPassword, requiredAttributeData, cb);
        });
    }
    /**
     * This is used for a certain user to confirm the registration by using a confirmation code
     * @param {string} confirmationCode Code entered by user.
     * @param {bool} forceAliasCreation Allow migrating from an existing email / phone number.
     * @param {nodeCallback<string>} callback Called on success or error.
     * @returns {void}
     */
    confirmRegistration(confirmationCode, forceAliasCreation, callback) {
        if (callback) {
            super.confirmRegistration(confirmationCode, forceAliasCreation, callback);
            return;
        }
        return promisify(super.confirmRegistration, { context: this })(confirmationCode, forceAliasCreation);
    }
    /**
     * This is used by the user once he has the responses to a custom challenge
     * @param {string} answerChallenge The custom challange answer.
     * @param {object} callback Result callback map.
     * @param {onFailure} callback.onFailure Called on any error.
     * @param {customChallenge} callback.customChallenge
     *    Custom challenge response required to continue.
     * @param {authSuccess} callback.onSuccess Called on success with the new session.
     * @returns {void}
     */
    sendCustomChallengeAnswer(answerChallenge, callback) {
        if (callback) {
            super.sendCustomChallengeAnswer(answerChallenge, callback);
            return;
        }
        return promisify(super.sendCustomChallengeAnswer, { context: this })(answerChallenge);
    }
    /**
     * This is used by the user once he has an MFA code
     * @param {string} confirmationCode The MFA code entered by the user.
     * @param {object} callback Result callback map.
     * @param {string} mfaType The mfa we are replying to.
     * @param {onFailure} callback.onFailure Called on any error.
     * @param {authSuccess} callback.onSuccess Called on success with the new session.
     * @returns {void}
     */
    sendMFACode(confirmationCode, callback, mfaType) {
        if (callback) {
            super.sendMFACode(confirmationCode, callback, mfaType);
            return;
        }
        return new Promise((resolve, reject) => {
            const cb = {
                onFailure: reject,
                onSuccess: resolve,
            };
            super.sendMFACode(confirmationCode, cb, mfaType);
        });
    }
    /**
     * This is used by an authenticated user to change the current password
     * @param {string} oldUserPassword The current password.
     * @param {string} newUserPassword The requested new password.
     * @param {nodeCallback<string>} callback Called on success or error.
     * @returns {void}
     */
    changePassword(oldUserPassword, newUserPassword, callback) {
        if (callback) {
            super.changePassword(oldUserPassword, newUserPassword, callback);
            return;
        }
        return promisify(super.changePassword, { context: this })(oldUserPassword, newUserPassword);
    }
    /**
     * This is used by an authenticated user to enable MFA for himself
     * @param {nodeCallback<string>} callback Called on success or error.
     * @returns {void}
     */
    enableMFA(callback) {
        if (callback) {
            super.enableMFA(callback);
            return;
        }
        return promisify(super.enableMFA, { context: this })();
    }
    /**
     * This is used by an authenticated user to disable MFA for himself
     * @param {nodeCallback<string>} callback Called on success or error.
     * @returns {void}
     */
    disableMFA(callback) {
        if (callback) {
            super.disableMFA(callback);
            return;
        }
        return promisify(super.disableMFA, { context: this })();
    }
    /**
     * This is used by an authenticated user to delete himself
     * @param {nodeCallback<string>} callback Called on success or error.
     * @returns {void}
     */
    deleteUser(callback) {
        if (callback) {
            super.deleteUser(callback);
            return;
        }
        return promisify(super.deleteUser, { context: this })();
    }
    /**
     * @typedef {CognitoUserAttribute | { Name:string, Value:string }} AttributeArg
     */
    /**
     * This is used by an authenticated user to change a list of attributes
     * @param {AttributeArg[]} attributes A list of the new user attributes.
     * @param {nodeCallback<string>} callback Called on success or error.
     * @returns {void}
     */
    updateAttributes(attributes, callback) {
        if (callback) {
            super.updateAttributes(attributes, callback);
            return;
        }
        return promisify(super.updateAttributes, { context: this })(attributes);
    }
    /**
     * This is used by an authenticated user to get a list of attributes
     * @param {nodeCallback<CognitoUserAttribute[]>} callback Called on success or error.
     * @returns {void}
     */
    getUserAttributes(callback) {
        if (callback) {
            super.getUserAttributes(callback);
            return;
        }
        return promisify(super.getUserAttributes, { context: this })();
    }
    /**
     * This is used by an authenticated user to get the MFAOptions
     * @param {nodeCallback<MFAOptions>} callback Called on success or error.
     * @returns {void}
     */
    getMFAOptions(callback) {
        if (callback) {
            super.getMFAOptions(callback);
            return;
        }
        return promisify(super.getMFAOptions, { context: this })();
    }
    /**
     * This is used by an authenticated user to delete a list of attributes
     * @param {string[]} attributeList Names of the attributes to delete.
     * @param {nodeCallback<string>} callback Called on success or error.
     * @returns {void}
     */
    deleteAttributes(attributeList, callback) {
        if (callback) {
            super.deleteAttributes(attributeList, callback);
            return;
        }
        return promisify(super.deleteAttributes, { context: this })(attributeList);
    }
    /**
     * This is used by a user to resend a confirmation code
     * @param {nodeCallback<string>} callback Called on success or error.
     * @returns {void}
     */
    resendConfirmationCode(callback) {
        if (callback) {
            super.resendConfirmationCode(callback);
            return;
        }
        return promisify(super.resendConfirmationCode, { context: this })();
    }
    /**
     * This is used to get a session, either from the session object
     * or from  the local storage, or by using a refresh token
     *
     * @param {nodeCallback<CognitoUserSession>} callback Called on success or error.
     * @returns {void}
     */
    // tslint:disable-next-line
    getSession(callback) {
        if (callback) {
            super.getSession.bind(this)(callback);
            return;
        }
        return promisify(super.getSession, { context: this })();
    }
    /**
     * This uses the refreshToken to retrieve a new session
     * @param {CognitoRefreshToken} refreshToken A previous session's refresh token.
     * @param {nodeCallback<CognitoUserSession>} callback Called on success or error.
     * @returns {void}
     */
    refreshSession(refreshToken, callback) {
        if (callback) {
            super.refreshSession(refreshToken, callback);
            return;
        }
        return promisify(super.refreshSession, { context: this })(refreshToken);
    }
    /**
     * This is used to initiate a forgot password request
     * @param {object} callback Result callback map.
     * @param {onFailure} callback.onFailure Called on any error.
     * @param {inputVerificationCode?} callback.inputVerificationCode
     *    Optional callback raised instead of onSuccess with response data.
     * @param {onSuccess} callback.onSuccess Called on success.
     * @returns {void}
     */
    forgotPassword(callback) {
        if (callback) {
            super.forgotPassword(callback);
            return;
        }
        return new Promise((resolve, reject) => {
            const cb = {
                onFailure: reject,
                onSuccess: resolve,
                inputVerificationCode: resolve,
            };
            super.forgotPassword(cb);
        });
    }
    /**
     * This is used to confirm a new password using a confirmationCode
     * @param {string} confirmationCode Code entered by user.
     * @param {string} newPassword Confirm new password.
     * @param {object} callback Result callback map.
     * @param {onFailure} callback.onFailure Called on any error.
     * @param {onSuccess<void>} callback.onSuccess Called on success.
     * @returns {void}
     */
    confirmPassword(confirmationCode, newPassword, callback) {
        if (callback) {
            super.confirmPassword(confirmationCode, newPassword, callback);
            return;
        }
        return new Promise((resolve, reject) => {
            const cb = {
                onFailure: reject,
                onSuccess: resolve,
            };
            super.confirmPassword(confirmationCode, newPassword, cb);
        });
    }
    /**
     * This is used to initiate an attribute confirmation request
     * @param {string} attributeName User attribute that needs confirmation.
     * @param {object} callback Result callback map.
     * @param {onFailure} callback.onFailure Called on any error.
     * @param {inputVerificationCode} callback.inputVerificationCode Called on success.
     * @returns {void}
     */
    getAttributeVerificationCode(attributeName, callback) {
        if (callback) {
            super.getAttributeVerificationCode(attributeName, callback);
            return;
        }
        return new Promise((resolve, reject) => {
            const cb = {
                onFailure: reject,
                onSuccess: resolve,
                inputVerificationCode: resolve,
            };
            super.getAttributeVerificationCode(attributeName, cb);
        });
    }
    /**
     * This is used to confirm an attribute using a confirmation code
     * @param {string} attributeName Attribute being confirmed.
     * @param {string} confirmationCode Code entered by user.
     * @param {object} callback Result callback map.
     * @param {onFailure} callback.onFailure Called on any error.
     * @param {onSuccess<string>} callback.onSuccess Called on success.
     * @returns {void}
     */
    verifyAttribute(attributeName, confirmationCode, callback) {
        if (callback) {
            super.verifyAttribute(attributeName, confirmationCode, callback);
            return;
        }
        return new Promise((resolve, reject) => {
            const cb = {
                onFailure: reject,
                onSuccess: resolve,
            };
            super.verifyAttribute(attributeName, confirmationCode, cb);
        });
    }
    /**
     * This is used to get the device information using the current device key
     * @param {object} callback Result callback map.
     * @param {onFailure} callback.onFailure Called on any error.
     * @param {onSuccess<*>} callback.onSuccess Called on success with device data.
     * @returns {void}
     */
    getDevice(callback) {
        if (callback) {
            super.getDevice(callback);
            return;
        }
        return new Promise((resolve, reject) => {
            const cb = {
                onFailure: reject,
                onSuccess: resolve,
            };
            super.getDevice(cb);
        });
    }
    /**
     * This is used to set the device status as remembered
     * @param {object} callback Result callback map.
     * @param {onFailure} callback.onFailure Called on any error.
     * @param {onSuccess<string>} callback.onSuccess Called on success.
     * @returns {void}
     */
    setDeviceStatusRemembered(callback) {
        if (callback) {
            super.setDeviceStatusRemembered(callback);
            return;
        }
        return new Promise((resolve, reject) => {
            const cb = {
                onFailure: reject,
                onSuccess: resolve,
            };
            super.setDeviceStatusRemembered(cb);
        });
    }
    /**
     * This is used to set the device status as not remembered
     * @param {object} callback Result callback map.
     * @param {onFailure} callback.onFailure Called on any error.
     * @param {onSuccess<string>} callback.onSuccess Called on success.
     * @returns {void}
     */
    setDeviceStatusNotRemembered(callback) {
        if (callback) {
            super.setDeviceStatusNotRemembered(callback);
            return;
        }
        return new Promise((resolve, reject) => {
            const cb = {
                onFailure: reject,
                onSuccess: resolve,
            };
            super.setDeviceStatusNotRemembered(cb);
        });
    }
    /**
     * This is used to list all devices for a user
     *
     * @param {int} limit the number of devices returned in a call
     * @param {string} paginationToken the pagination token in case any was returned before
     * @param {object} callback Result callback map.
     * @param {onFailure} callback.onFailure Called on any error.
     * @param {onSuccess<*>} callback.onSuccess Called on success with device list.
     * @returns {void}
     */
    listDevices(limit, paginationToken, callback) {
        if (callback) {
            super.listDevices(limit, paginationToken, callback);
            return;
        }
        return new Promise((resolve, reject) => {
            const cb = {
                onFailure: reject,
                onSuccess: resolve,
            };
            super.listDevices(limit, paginationToken, cb);
        });
    }
    /**
     * This is used to globally revoke all tokens issued to a user
     * @param {object} callback Result callback map.
     * @param {onFailure} callback.onFailure Called on any error.
     * @param {onSuccess<string>} callback.onSuccess Called on success.
     * @returns {void}
     */
    globalSignOut(callback) {
        if (callback) {
            super.globalSignOut(callback);
            return;
        }
        return new Promise((resolve, reject) => {
            const cb = {
                onFailure: reject,
                onSuccess: resolve,
            };
            super.globalSignOut(cb);
        });
    }
    /**
     * This is used by an authenticated or a user trying to authenticate to associate a TOTP MFA
     * @param {nodeCallback<string>} callback Called on success or error.
     * @returns {void}
     */
    associateSoftwareToken(callback) {
        if (callback) {
            super.associateSoftwareToken(callback);
            return;
        }
        return new Promise((resolve, reject) => {
            const cb = {
                onFailure: reject,
                associateSecretCode: resolve,
            };
            super.associateSoftwareToken(cb);
        });
    }
    /**
     * This is used by an authenticated or a user trying to authenticate to verify a TOTP MFA
     * @param {string} totpCode The MFA code entered by the user.
     * @param {string} friendlyDeviceName The device name we are assigning to the device.
     * @param {nodeCallback<string>} callback Called on success or error.
     * @returns {void}
     */
    verifySoftwareToken(totpCode, friendlyDeviceName, callback) {
        if (callback) {
            super.verifySoftwareToken(totpCode, friendlyDeviceName, callback);
            return;
        }
        return new Promise((resolve, reject) => {
            const cb = {
                onFailure: reject,
                onSuccess: resolve,
            };
            super.verifySoftwareToken(totpCode, friendlyDeviceName, cb);
        });
    }
}
exports.default = CognitoUserWrapper;
//# sourceMappingURL=cognito-user.js.map