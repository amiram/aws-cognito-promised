import CognitoUserWrapper from "./cognito-user";
import {
  AuthenticationDetails,
  CognitoUserSession,
  IAuthenticationDetailsData,
} from "amazon-cognito-identity-js";

const cognitoUser = new CognitoUserWrapper(null);
cognitoUser.authenticateUser(new AuthenticationDetails({} as IAuthenticationDetailsData)).then(console.log).catch(console.log);
cognitoUser.authenticateUser(new AuthenticationDetails({} as IAuthenticationDetailsData), {
  onSuccess: (session: CognitoUserSession, userConfirmationNecessary?: boolean) => {
    console.log(session.isValid());
  },
  onFailure: (err: any) => {
    console.log(err);
  },
});

cognitoUser.completeNewPasswordChallenge("", "").then(session => console.log(session.isValid())).catch(console.log);
cognitoUser.completeNewPasswordChallenge("", "", {
  onSuccess: (session: CognitoUserSession) => {
    console.log(session.isValid());
  },
  onFailure: (err: any) => {
    console.log(err);
  },
});

cognitoUser.confirmRegistration("", true).then(result => result.toLowerCase()).catch(console.log);
cognitoUser.confirmRegistration("", true, (err, result) => {
  console.log(err);
  (result || "").toLowerCase();
});

cognitoUser.sendCustomChallengeAnswer(null).then(console.log).catch(console.log);
cognitoUser.sendCustomChallengeAnswer(null, (err, result) => {
  console.log(err);
  (result || "").toLowerCase();
});
