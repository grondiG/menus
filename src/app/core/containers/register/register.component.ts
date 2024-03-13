import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AsyncPipe, NgIf, NgStyle } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { userIsLoadingSelector } from '../../../store/user/user.reducer';
import { RegisterData } from '../../models/authentication';
import { CoreModule } from '../../core.module';
import { PreventDefaultDirective } from '../../directives/prevent-default/prevent-default.directive';
import { CheckPasswordValidator } from '../../directives/validators';
import { StrongPasswordDirective } from '../../directives/validators/strong-password.directive';
import { CheckNamesValidator } from '../../directives/validators/check-names.directive';
import { ErrorMessageDirective } from '../../directives/error-message/error-message.directive';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    PreventDefaultDirective,
    FormsModule,
    RouterLink,
    NgStyle,
    NgIf,
    CoreModule,
    AsyncPipe,
    CheckPasswordValidator,
    StrongPasswordDirective,
    CheckNamesValidator,
    ErrorMessageDirective,
  ],
  standalone: true
})
export class RegisterComponent{
  private store: Store = inject(Store);
  isLoading$: Observable<boolean> = this.store.select(userIsLoadingSelector);

  registerForm: RegisterData = {
    login: '12333',
    mail: '',
    restaurantName: '',
    restaurantAddress: '',
    password: 'asd',
    confirmPassword: ''
  }
  // registerData: ModelFormGroup<RegisterData> = new FormGroup({
  //   login: new FormControl('', [ Validators.required, Validators.minLength(3) ]),
  //   mail: new FormControl('', [ Validators.required, Validators.email ]),
  //   restaurantName: new FormControl('', [ Validators.required ]),
  //   restaurantAddress: new FormControl('', [ Validators.required ]),
  //   password: new FormControl('', [ Validators.required, passwordValidator ]),
  //   confirmPassword: new FormControl('', [ Validators.required ])
  // }, confirmPasswordValidator)

  register(form: NgForm): void {
    Object.keys(form.controls).forEach((controlName: string) => form.controls[controlName].markAsDirty());
    console.log(form);
    // this.store.dispatch({ type: "[Profile] Register", data: this.registerData.value });
  }

  // checkIfInputIsInvalid(inputName: string): boolean {
  //   if (inputName === 'confirmPassword' && this.registerData.controls[inputName].touched) {
  //     return this.registerData.hasError('passwordMismatch');
  //   }
  //   return this.registerData.controls[inputName].invalid && this.registerData.controls[inputName].touched;
  // }

}
