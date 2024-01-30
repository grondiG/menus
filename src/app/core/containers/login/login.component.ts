import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PreventDefaultDirective } from '../../directives/prevent-default/prevent-default.directive';
import { RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginData } from '../../models/login-data';
import { ModelFormGroup } from '../../types/form';
import { Store } from '@ngrx/store';
import * as profileAction from '../../../store/profile/profile.actions';

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
  private store: Store = inject(Store);

  loginForm: ModelFormGroup<LoginData> = new FormGroup({
    login: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })

  login(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAsDirty();
      return;
    }

    const data: LoginData = this.loginForm.getRawValue();
    this.store.dispatch(profileAction.loadProfile({ data }));
  }
}
