import {$localize} from '@angular/localize/init'

export const messages = {
  can_not_modify_super_user: $localize`You are not allowed to update super user!`,
  invalid_body: $localize`You are sending invalid information!`,
  invalid_credentials: $localize`The username and password do not match!`,
  internal_server_error: $localize`OOps something went wrong! Please try again later.`,
  not_found: $localize`We could not find this item!`,
  not_authorized: $localize`You are not authorized to access this content!`,
  token_expired: $localize`Your session is expired. Please login again.`,
  invalid_otp: $localize`The OTP is incorrect! Please try again.`,
  token_required: $localize`Token is required for this operation!`,
  still_have_active_reset_pass_link: $localize`You can't send a request right now. Please try later!`,
  email_must_be_verified: $localize`Please verify your email first! If you don't have the email try resetting your password`,
  duplicated_entry: $localize`You can not create duplicated entry!`,
  protected_entry: $localize`This entry is protected!`,
}
