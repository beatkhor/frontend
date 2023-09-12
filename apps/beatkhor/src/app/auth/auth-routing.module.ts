import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";

import { SignInComponent } from "./sign-in.component";
import { AuthGuard } from "../core/guards/auth.guard";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "signin",
  },
  {
    path: "signin",
    canActivate: [AuthGuard],
    component: SignInComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
