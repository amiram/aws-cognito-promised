import {CustomChallengeError} from "./custom-challenge-error";
import {MfaRequiredError} from "./mfa-required-error";
import {MfaSetupError} from "./mfa-setup-error";
import {NewPasswordRequiredError} from "./new-password-required-error";
import {SelectMfaTypeError} from "./select-mfa-type-error";
import {TotpRequiredError} from "./totp-required-error";

export type AuthenticateError =
  | CustomChallengeError
  | MfaRequiredError
  | MfaSetupError
  | NewPasswordRequiredError
  | SelectMfaTypeError
  | TotpRequiredError;
