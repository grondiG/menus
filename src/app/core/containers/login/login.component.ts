import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import { PreventDefaultDirective } from "../../directives/prevent-default/prevent-default.directive";
import { RouterLink } from "@angular/router";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { LoginData } from "../../models/login-data";
import { ModelFormGroup } from "../../types/form";
import { Store } from "@ngrx/store";
import {loadProfile} from "../../../store/profile/profile.actions";
import {of} from "rxjs";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    PreventDefaultDirective,
    RouterLink,
    ReactiveFormsModule
  ],
  standalone: true

})
export class LoginComponent {
  private profileStore: Store<any> = inject(Store);

  loginForm: ModelFormGroup<LoginData> = new FormGroup({
    login: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })

  login(): void {
    this.profileStore.dispatch(loadProfile(<LoginData>this.loginForm.value));
  }
}
