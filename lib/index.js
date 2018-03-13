"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("amazon-cognito-identity-js"));
var cognito_user_1 = require("./cognito-user");
exports.CognitoUser = cognito_user_1.default;
var cognito_user_pool_1 = require("./cognito-user-pool");
exports.CognitoUserPool = cognito_user_pool_1.default;
//# sourceMappingURL=index.js.map