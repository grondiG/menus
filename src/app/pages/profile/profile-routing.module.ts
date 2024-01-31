import { RouterModule, Routes } from "@angular/router";
import { ProfileComponent } from "./profile.component";
import { RegisterComponent } from "../../core/containers/register/register.component";
import { LoginComponent } from "../../core/containers/login/login.component";
import { NgModule } from "@angular/core";
import {skipLoginGuard} from "../../core/guards/skip-login.guard";

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [skipLoginGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [skipLoginGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    ProfileComponent,
    RegisterComponent,
    LoginComponent
  ],
  exports: [RouterModule]
})
export class ProfileRoutingModule {}
