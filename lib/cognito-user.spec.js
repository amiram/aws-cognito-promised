"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const cognito = __importStar(require("amazon-cognito-identity-js"));
const cognito_user_1 = __importDefault(require("./cognito-user"));
describe("cognito user tests", () => {
    let cognitoUser;
    beforeEach(() => {
        cognitoUser = new cognito_user_1.default(null);
    });
    it("authenticateUser callback", done => {
        cognitoUser.authenticateUser(new cognito.AuthenticationDetails({
            Username: "user",
            Password: "pwd"
        }), {
            onSuccess: () => done(),
            onFailure: err => done(err)
        });
    });
});
