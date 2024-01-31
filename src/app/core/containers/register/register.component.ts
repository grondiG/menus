import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from "@ngrx/store";
import { RouterLink } from "@angular/router";
import { NgStyle } from "@angular/common";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { PreventDefaultDirective } from "../../directives/prevent-default/prevent-default.directive";
import { confirmPasswordValidator } from "../../validators/confirm-password.validator";
import { passwordValidator } from "../../validators/password";
import { RegisterData } from "../../models/register-data";
import { ModelFormGroup } from "../../types/form";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    PreventDefaultDirective,
    ReactiveFormsModule,
    RouterLink,
    NgStyle
  ],
  standalone: true
})
export class RegisterComponent {
  private store: Store = inject(Store);

  registerData: ModelFormGroup<RegisterData> = new FormGroup({
    login: new FormControl('', [Validators.required, Validators.minLength(3)]),
    mail: new FormControl('', [Validators.required, Validators.email]),
    restaurantName: new FormControl('', [Validators.required]),
    restaurantAddress: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, passwordValidator]),
    confirmPassword: new FormControl('', [Validators.required])
  }, confirmPasswordValidator)

  register(): void {
    this.store.dispatch({type: "[Profile] Register", data: this.registerData.value});
  }

}
