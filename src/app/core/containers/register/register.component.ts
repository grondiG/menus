import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AsyncPipe, NgIf, NgStyle } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PreventDefaultDirective } from '../../directives/prevent-default/prevent-default.directive';
import { ModelFormGroup } from '../../types/form';
import { confirmPasswordValidator } from '../../validators/confirm-password.validator';
import { passwordValidator } from '../../validators/password';
import { userIsLoadingSelector } from '../../../store/user/user.reducer';
import { CoreModule } from '../../core.module';
import { RegisterData } from '../../models/authentication';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    PreventDefaultDirective,
    ReactiveFormsModule,
    RouterLink,
    NgStyle,
    NgIf,
    CoreModule,
    AsyncPipe
  ],
  standalone: true
})
export class RegisterComponent {
  private store: Store = inject(Store);
  isLoading$: Observable<boolean> = this.store.select(userIsLoadingSelector);

  registerData: ModelFormGroup<RegisterData> = new FormGroup({
    login: new FormControl('', [ Validators.required, Validators.minLength(3) ]),
    mail: new FormControl('', [ Validators.required, Validators.email ]),
    restaurantName: new FormControl('', [ Validators.required ]),
    restaurantAddress: new FormControl('', [ Validators.required ]),
    password: new FormControl('', [ Validators.required, passwordValidator ]),
    confirmPassword: new FormControl('', [ Validators.required ])
  }, confirmPasswordValidator)

  register(): void {
    this.store.dispatch({ type: "[Profile] Register", data: this.registerData.value });
  }
}
