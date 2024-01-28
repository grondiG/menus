import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import { PreventDefaultDirective } from "../../directives/prevent-default/prevent-default.directive";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ModelFormGroup } from "../../types/form";
import { RegisterData } from "../../models/register-data";
import { confirmPasswordValidator } from "../../validators/confirm-password.validator";
import { passwordValidator } from "../../validators/password";
import { RouterLink } from "@angular/router";
import { NgStyle } from "@angular/common";
import {Store} from "@ngrx/store";

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
    console.log(this.registerData.value);
    this.store.dispatch({type: "[Profile] Register", data: this.registerData.value});
  }

}
