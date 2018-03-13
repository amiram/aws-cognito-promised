import {CognitoUserSession} from "amazon-cognito-identity-js";

export interface AuthenticateSuccessResult {
  session: CognitoUserSession;
  userConfirmationNecessary?: boolean;
}
