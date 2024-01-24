import { RouterModule, Routes } from "@angular/router";
import { ProfileComponent } from "./profile.component";
import { RegisterComponent } from "../../core/containers/register/register.component";
import { LoginComponent } from "../../core/containers/login/login.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
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
