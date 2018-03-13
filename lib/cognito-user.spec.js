"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const cognito_user_1 = __importDefault(require("./cognito-user"));
const amazon_cognito_identity_js_1 = require("amazon-cognito-identity-js");
const cognitoUser = new cognito_user_1.default(null);
cognitoUser.authenticateUser(new amazon_cognito_identity_js_1.AuthenticationDetails({})).then(console.log).catch(console.log);
cognitoUser.authenticateUser(new amazon_cognito_identity_js_1.AuthenticationDetails({}), {
    onSuccess: (session, userConfirmationNecessary) => {
        console.log(session.isValid());
    },
    onFailure: (err) => {
        console.log(err);
    },
});
cognitoUser.completeNewPasswordChallenge("", "").then(session => console.log(session.isValid())).catch(console.log);
cognitoUser.completeNewPasswordChallenge("", "", {
    onSuccess: (session) => {
        console.log(session.isValid());
    },
    onFailure: (err) => {
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
//# sourceMappingURL=cognito-user.spec.js.map