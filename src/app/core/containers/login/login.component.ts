import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PreventDefaultDirective } from "../../directives/prevent-default/prevent-default.directive";
import { RouterLink } from "@angular/router";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { LoginData } from "../../models/login-data";
import { ModelFormGroup } from "../../types/form";
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
  loginForm: ModelFormGroup<LoginData> = new FormGroup({
    login: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })

  login(): void {
    console.log(this.loginForm.value);
  }
}
