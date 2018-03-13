import { CognitoUserAttribute, CognitoUserPool, ISignUpResult, NodeCallback } from "amazon-cognito-identity-js";
import CognitoUserWrapper from "./cognito-user";
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
    signUp(username: string, password: string, userAttributes: CognitoUserAttribute[], validationData: CognitoUserAttribute[]): Promise<ISignUpResult>;
    signUp(username: string, password: string, userAttributes: CognitoUserAttribute[], validationData: CognitoUserAttribute[], callback: NodeCallback<Error, ISignUpResult>): void;
    getCurrentUser(): CognitoUserWrapper | null;
}
