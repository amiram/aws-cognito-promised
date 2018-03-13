import { AuthenticationDetails, CognitoRefreshToken, CognitoUser, CognitoUserAttribute, CognitoUserSession, ICognitoUserAttributeData, MFAOption, NodeCallback } from "amazon-cognito-identity-js";
import { AuthenticateSuccessResult } from "./authenticate-success-result";
export default class CognitoUserWrapper extends CognitoUser {
    /**
     * Constructs a new CognitoUser object
     * @param {object} data Creation options
     * @param {string} data.Username The user's username.
     * @param {CognitoUserPool} data.Pool Pool containing the user.
     * @param {object} data.Storage Optional storage object.
     */
    constructor(data: any);
    authenticateUser(authDetails: AuthenticationDetails): Promise<AuthenticateSuccessResult>;
    authenticateUser(authDetails: AuthenticationDetails, callback: {
        onSuccess: (session: CognitoUserSession, userConfirmationNecessary?: boolean) => void;
        onFailure: (err: any) => void;
        newPasswordRequired?: (userAttributes: any, requiredAttributes: any) => void;
        mfaRequired?: (challengeName: any, challengeParameters: any) => void;
        totpRequired?: (challengeName: any, challengeParameters: any) => void;
        customChallenge?: (challengeParameters: any) => void;
        mfaSetup?: (challengeName: any, challengeParameters: any) => void;
        selectMFAType?: (challengeName: any, challengeParameters: any) => void;
    }): void;
    completeNewPasswordChallenge(newPassword: string, requiredAttributeData: any): Promise<CognitoUserSession>;
    completeNewPasswordChallenge(newPassword: string, requiredAttributeData: any, callback: {
        onSuccess: (session: CognitoUserSession) => void;
        onFailure: (err: any) => void;
        mfaRequired?: (challengeName: any, challengeParameters: any) => void;
        customChallenge?: (challengeParameters: any) => void;
    }): void;
    confirmRegistration(confirmationCode: string, forceAliasCreation: boolean): Promise<string>;
    confirmRegistration(confirmationCode: string, forceAliasCreation: boolean, callback: NodeCallback<any, string>): void;
    sendCustomChallengeAnswer(answerChallenge: any): Promise<any>;
    sendCustomChallengeAnswer(answerChallenge: any, callback?: NodeCallback<any, any>): void;
    sendMFACode(confirmationCode: string, callback: null, mfaType: string): Promise<CognitoUserSession>;
    sendMFACode(confirmationCode: string, callback: {
        onSuccess: (session: CognitoUserSession) => void;
        onFailure: (err: any) => void;
    }, mfaType: string): void;
    changePassword(oldUserPassword: string, newUserPassword: string): Promise<"SUCCESS">;
    changePassword(oldUserPassword: string, newUserPassword: string, callback: NodeCallback<Error, "SUCCESS">): void;
    enableMFA(): Promise<string>;
    enableMFA(callback: NodeCallback<Error, string>): void;
    disableMFA(): Promise<string>;
    disableMFA(callback: NodeCallback<Error, string>): void;
    deleteUser(): Promise<string>;
    deleteUser(callback: NodeCallback<Error, string>): void;
    updateAttributes(attributes: ICognitoUserAttributeData[]): Promise<string>;
    updateAttributes(attributes: ICognitoUserAttributeData[], callback: NodeCallback<Error, string>): void;
    getUserAttributes(): Promise<CognitoUserAttribute[]>;
    getUserAttributes(callback: NodeCallback<Error, CognitoUserAttribute[]>): void;
    getMFAOptions(): Promise<MFAOption[]>;
    getMFAOptions(callback: NodeCallback<Error, MFAOption[]>): void;
    deleteAttributes(attributeList: string[]): Promise<string>;
    deleteAttributes(attributeList: string[], callback: NodeCallback<Error, string>): void;
    resendConfirmationCode(): Promise<"SUCCESS">;
    resendConfirmationCode(callback: NodeCallback<Error, "SUCCESS">): void;
    getSession(): Promise<CognitoUserSession>;
    getSession(callback: () => {}): void;
    refreshSession(refreshToken: CognitoRefreshToken): Promise<CognitoUserSession>;
    refreshSession(refreshToken: CognitoRefreshToken, callback: NodeCallback<Error, CognitoUserSession>): void;
    forgotPassword(): Promise<any>;
    forgotPassword(callback: {
        onSuccess: (data: any) => void;
        onFailure: (err: Error) => void;
        inputVerificationCode?: (data: any) => void;
    }): void;
    confirmPassword(confirmationCode: string, newPassword: string): Promise<void>;
    confirmPassword(confirmationCode: string, newPassword: string, callback: {
        onSuccess: () => void;
        onFailure: (err: Error) => void;
    }): void;
    getAttributeVerificationCode(attributeName: string): Promise<string | void>;
    getAttributeVerificationCode(attributeName: string, callback: {
        onSuccess: () => void;
        onFailure: (err: Error) => void;
        inputVerificationCode: (data: string) => void;
    }): void;
    verifyAttribute(attributeName: string, confirmationCode: string): Promise<string>;
    verifyAttribute(attributeName: string, confirmationCode: string, callback: {
        onSuccess: (success: string) => void;
        onFailure: (err: Error) => void;
    }): void;
    getDevice(): Promise<string>;
    getDevice(callback: {
        onSuccess: (success: string) => void;
        onFailure: (err: Error) => void;
    }): void;
    setDeviceStatusRemembered(): Promise<string>;
    setDeviceStatusRemembered(callback: {
        onSuccess: (success: string) => void;
        onFailure: (err: any) => void;
    }): void;
    setDeviceStatusNotRemembered(): Promise<string>;
    setDeviceStatusNotRemembered(callback: {
        onSuccess: (success: string) => void;
        onFailure: (err: any) => void;
    }): void;
    listDevices(limit: number, paginationToken: string): Promise<any>;
    listDevices(limit: number, paginationToken: string, callback: {
        onSuccess: (data: any) => void;
        onFailure: (err: Error) => void;
    }): void;
    globalSignOut(): Promise<string>;
    globalSignOut(callback: {
        onSuccess: (msg: string) => void;
        onFailure: (err: Error) => void;
    }): void;
    associateSoftwareToken(): Promise<string>;
    associateSoftwareToken(callback: {
        associateSecretCode: (secretCode: string) => void;
        onFailure: (err: any) => void;
    }): void;
    verifySoftwareToken(totpCode: any, friendlyDeviceName: any): Promise<CognitoUserSession>;
    verifySoftwareToken(totpCode: any, friendlyDeviceName: any, callback: {
        onSuccess: (session: CognitoUserSession) => void;
        onFailure: (err: Error) => void;
    }): void;
}
