import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { AuthRoutingModule } from "./auth-routing.module";
import { SharedModule } from "../shared/shared.module";
import { SignInComponent } from "./sign-in.component";

@NgModule({
  declarations: [SignInComponent],
  imports: [SharedModule, CommonModule, AuthRoutingModule],
})
export class AuthModule {}
