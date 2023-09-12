import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { SignInComponent } from "./auth-sign-in.component";
import { SignUpComponent } from "./auth-sign-up.component";
import { AuthRoutingModule } from "./auth-routing.module";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [SignInComponent, SignUpComponent],
  imports: [SharedModule, CommonModule, AuthRoutingModule],
})
export class AuthModule {}
