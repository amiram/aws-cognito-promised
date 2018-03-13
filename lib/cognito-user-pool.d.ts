import { CognitoUserAttribute, CognitoUserPool, ISignUpResult, NodeCallback } from "amazon-cognito-identity-js";
export default class CognitoUserPoolWrapper extends CognitoUserPool {
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
    constructor(data: any);
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
    signUp(username: string, password: string, userAttributes: CognitoUserAttribute[], validationData: CognitoUserAttribute[], callback?: NodeCallback<Error, ISignUpResult>): Promise<ISignUpResult> | void;
}
