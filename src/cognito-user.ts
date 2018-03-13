import {
  AuthenticationDetails,
  CognitoRefreshToken, CognitoUser,
  CognitoUserAttribute,
  CognitoUserSession,
  ICognitoUserAttributeData, MFAOption, NodeCallback,
} from "amazon-cognito-identity-js";
import {NewPasswordRequiredError} from "./errors/new-password-required-error";
import {MfaRequiredError} from "./errors/mfa-required-error";
import {TotpRequiredError} from "./errors/totp-required-error";
import {CustomChallengeError} from "./errors/custom-challenge-error";
import {MfaSetupError} from "./errors/mfa-setup-error";
import {SelectMfaTypeError} from "./errors/select-mfa-type-error";
import {AuthenticateSuccessResult} from "./authenticate-success-result";

const {promisify} = require("bluebird");

export default class CognitoUserWrapper extends CognitoUser {

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
  public authenticateUser(authDetails: AuthenticationDetails, callback?: {
    onSuccess: (session: CognitoUserSession, userConfirmationNecessary?: boolean) => void,
    onFailure: (err: any) => void,
    newPasswordRequired?: (userAttributes: any, requiredAttributes: any) => void,
    mfaRequired?: (challengeName: any, challengeParameters: any) => void,
    totpRequired?: (challengeName: any, challengeParameters: any) => void,
    customChallenge?: (challengeParameters: any) => void,
    mfaSetup?: (challengeName: any, challengeParameters: any) => void,
    selectMFAType?: (challengeName: any, challengeParameters: any) => void,
  }): Promise<AuthenticateSuccessResult> | void {
    if (callback) {
      super.authenticateUser(authDetails, callback);
      return;
    }

    return new Promise<AuthenticateSuccessResult>((resolve, reject) => {
      const cb = {
        onFailure: reject,
        onSuccess: (session, userConfirmationNecessary) => resolve({session, userConfirmationNecessary}),
        newPasswordRequired: (userAttributes, requiredAttributes) => reject(new NewPasswordRequiredError(userAttributes, requiredAttributes)),
        mfaRequired: (challengeName, challengeParameters) => reject(new MfaRequiredError(challengeName, challengeParameters)),
        totpRequired: (challengeName, challengeParameters) => reject(new TotpRequiredError(challengeName, challengeParameters)),
        customChallenge: challengeParameters => reject(new CustomChallengeError(challengeParameters)),
        mfaSetup: (challengeName, challengeParameters) => reject(new MfaSetupError(challengeName, challengeParameters)),
        selectMFAType: (challengeName, challengeParameters) => reject(new SelectMfaTypeError(challengeName, challengeParameters)),
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
  completeNewPasswordChallenge(newPassword: string,
                               requiredAttributeData: any,
                               callback?: {
                                 onSuccess: (session: CognitoUserSession) => void,
                                 onFailure: (err: any) => void,
                                 mfaRequired?: (challengeName: any, challengeParameters: any) => void,
                                 customChallenge?: (challengeParameters: any) => void,
                               }): Promise<CognitoUserSession> | void {
    if (callback) {
      super.completeNewPasswordChallenge(newPassword, requiredAttributeData, callback);
      return;
    }

    return new Promise<CognitoUserSession>((resolve, reject) => {
      const cb = {
        onFailure: reject,
        onSuccess: resolve,
        mfaRequired: (challengeName, challengeParameters) => reject(new MfaRequiredError(challengeName, challengeParameters)),
        customChallenge: challengeParameters => reject(new CustomChallengeError(challengeParameters)),
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
  confirmRegistration(confirmationCode: string, forceAliasCreation: boolean, callback?: NodeCallback<any, string>): Promise<string> | void {
    if (callback) {
      super.confirmRegistration(confirmationCode, forceAliasCreation, callback);
      return;
    }

    return promisify(super.confirmRegistration)(confirmationCode, forceAliasCreation);
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
  sendCustomChallengeAnswer(answerChallenge: any, callback?: NodeCallback<any, any>): Promise<any> | void {
    if (callback) {
      super.sendCustomChallengeAnswer(answerChallenge, callback);
      return;
    }

    return promisify(super.sendCustomChallengeAnswer)(answerChallenge);
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
  sendMFACode(confirmationCode: string, callback: { onSuccess: (session: CognitoUserSession) => void, onFailure: (err: any) => void } | null, mfaType: string): Promise<CognitoUserSession> | void {
    if (callback) {
      super.sendMFACode(confirmationCode, callback, mfaType);
      return;
    }

    return new Promise<CognitoUserSession>((resolve, reject) => {
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
  changePassword(oldUserPassword: string, newUserPassword: string, callback?: NodeCallback<Error, "SUCCESS">): Promise<"SUCCESS"> | void {
    if (callback) {
      super.changePassword(oldUserPassword, newUserPassword, callback);
      return;
    }

    return promisify(super.changePassword)(oldUserPassword, newUserPassword);
  }

  /**
   * This is used by an authenticated user to enable MFA for himself
   * @param {nodeCallback<string>} callback Called on success or error.
   * @returns {void}
   */
  enableMFA(callback?: NodeCallback<Error, string>): Promise<string> | void {
    if (callback) {
      super.enableMFA(callback);
      return;
    }

    return promisify(super.enableMFA)();
  }

  /**
   * This is used by an authenticated user to disable MFA for himself
   * @param {nodeCallback<string>} callback Called on success or error.
   * @returns {void}
   */
  disableMFA(callback?: NodeCallback<Error, string>): Promise<string> | void {
    if (callback) {
      super.disableMFA(callback);
      return;
    }

    return promisify(super.disableMFA)();
  }

  /**
   * This is used by an authenticated user to delete himself
   * @param {nodeCallback<string>} callback Called on success or error.
   * @returns {void}
   */
  deleteUser(callback?: NodeCallback<Error, string>): Promise<string> | void {
    if (callback) {
      super.deleteUser(callback);
      return;
    }

    return promisify(super.deleteUser)();
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
  updateAttributes(attributes: ICognitoUserAttributeData[], callback?: NodeCallback<Error, string>): Promise<string> | void {
    if (callback) {
      super.updateAttributes(attributes, callback);
      return;
    }

    return promisify(super.updateAttributes)(attributes);
  }

  /**
   * This is used by an authenticated user to get a list of attributes
   * @param {nodeCallback<CognitoUserAttribute[]>} callback Called on success or error.
   * @returns {void}
   */
  getUserAttributes(callback?: NodeCallback<Error, CognitoUserAttribute[]>): Promise<CognitoUserAttribute[]> | void {
    if (callback) {
      super.getUserAttributes(callback);
      return;
    }

    return promisify(super.getUserAttributes)();
  }

  /**
   * This is used by an authenticated user to get the MFAOptions
   * @param {nodeCallback<MFAOptions>} callback Called on success or error.
   * @returns {void}
   */
  getMFAOptions(callback?: NodeCallback<Error, MFAOption[]>): Promise<MFAOption[]> | void {
    if (callback) {
      super.getMFAOptions(callback);
      return;
    }

    return promisify(super.getMFAOptions)();
  }

  /**
   * This is used by an authenticated user to delete a list of attributes
   * @param {string[]} attributeList Names of the attributes to delete.
   * @param {nodeCallback<string>} callback Called on success or error.
   * @returns {void}
   */
  deleteAttributes(attributeList: string[], callback: NodeCallback<Error, string>): Promise<string> | void {
    if (callback) {
      super.deleteAttributes(attributeList, callback);
      return;
    }

    return promisify(super.deleteAttributes)(attributeList);
  }

  /**
   * This is used by a user to resend a confirmation code
   * @param {nodeCallback<string>} callback Called on success or error.
   * @returns {void}
   */
  resendConfirmationCode(callback?: NodeCallback<Error, "SUCCESS">): Promise<"SUCCESS"> | void {
    if (callback) {
      super.resendConfirmationCode(callback);
      return;
    }

    return promisify(super.resendConfirmationCode)();
  }

  /**
   * This is used to get a session, either from the session object
   * or from  the local storage, or by using a refresh token
   *
   * @param {nodeCallback<CognitoUserSession>} callback Called on success or error.
   * @returns {void}
   */
  // tslint:disable-next-line
  getSession(callback?: Function): Promise<CognitoUserSession> | void {
    if (callback) {
      super.getSession(callback);
      return;
    }

    return promisify(super.getSession)();
  }

  /**
   * This uses the refreshToken to retrieve a new session
   * @param {CognitoRefreshToken} refreshToken A previous session's refresh token.
   * @param {nodeCallback<CognitoUserSession>} callback Called on success or error.
   * @returns {void}
   */
  refreshSession(refreshToken: CognitoRefreshToken, callback?: NodeCallback<Error, CognitoUserSession>): Promise<CognitoUserSession> | void {
    if (callback) {
      super.refreshSession(refreshToken, callback);
      return;
    }

    return promisify(super.refreshSession)(refreshToken);
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
  forgotPassword(callback?: { onSuccess: (data: any) => void, onFailure: (err: Error) => void, inputVerificationCode?: (data: any) => void }): Promise<any> | void {
    if (callback) {
      super.forgotPassword(callback);
      return;
    }

    return new Promise<any>((resolve, reject) => {
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
  confirmPassword(confirmationCode: string, newPassword: string, callback?: { onSuccess: () => void, onFailure: (err: Error) => void }): Promise<void> | void {
    if (callback) {
      super.confirmPassword(confirmationCode, newPassword, callback);
      return;
    }

    return new Promise<void>((resolve, reject) => {
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
  getAttributeVerificationCode(attributeName: string, callback?: { onSuccess: () => void, onFailure: (err: Error) => void, inputVerificationCode: (data: string) => void }): Promise<string | void> | void {
    if (callback) {
      super.getAttributeVerificationCode(attributeName, callback);
      return;
    }

    return new Promise<string | void>((resolve, reject) => {
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
  verifyAttribute(attributeName: string, confirmationCode: string, callback?: { onSuccess: (success: string) => void, onFailure: (err: Error) => void }): Promise<string> | void {
    if (callback) {
      super.verifyAttribute(attributeName, confirmationCode, callback);
      return;
    }

    return new Promise<string>((resolve, reject) => {
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
  getDevice(callback?: { onSuccess: (success: string) => void, onFailure: (err: Error) => void }): Promise<string> | void {
    if (callback) {
      super.getDevice(callback);
      return;
    }

    return new Promise<string>((resolve, reject) => {
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
  setDeviceStatusRemembered(callback?: { onSuccess: (success: string) => void, onFailure: (err: any) => void }): Promise<string> | void {
    if (callback) {
      super.setDeviceStatusRemembered(callback);
      return;
    }

    return new Promise<string>((resolve, reject) => {
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
  setDeviceStatusNotRemembered(callback?: { onSuccess: (success: string) => void, onFailure: (err: any) => void }): Promise<string> | void {
    if (callback) {
      super.setDeviceStatusNotRemembered(callback);
      return;
    }

    return new Promise<string>((resolve, reject) => {
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
  listDevices(limit: number, paginationToken: string, callback?: { onSuccess: (data: any) => void, onFailure: (err: Error) => void }): Promise<any> | void {
    if (callback) {
      super.listDevices(limit, paginationToken, callback);
      return;
    }

    return new Promise<any>((resolve, reject) => {
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
  globalSignOut(callback?: { onSuccess: (msg: string) => void, onFailure: (err: Error) => void }): Promise<string> | void {
    if (callback) {
      super.globalSignOut(callback);
      return;
    }

    return new Promise<string>((resolve, reject) => {
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
  associateSoftwareToken(callback?: {
    associateSecretCode: (secretCode: string) => void,
    onFailure: (err: any) => void,
  }): Promise<string> | void {
    if (callback) {
      super.associateSoftwareToken(callback);
      return;
    }

    return new Promise<string>((resolve, reject) => {
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
  verifySoftwareToken(totpCode, friendlyDeviceName, callback?: {onSuccess: (session: CognitoUserSession) => void, onFailure: (err: Error) => void}): Promise<CognitoUserSession> | void {
    if (callback) {
      super.verifySoftwareToken(totpCode, friendlyDeviceName, callback);
      return;
    }

    return new Promise<CognitoUserSession>((resolve, reject) => {
      const cb = {
        onFailure: reject,
        onSuccess: resolve,
      };

      super.verifySoftwareToken(totpCode, friendlyDeviceName, cb);
    });
  }
}
