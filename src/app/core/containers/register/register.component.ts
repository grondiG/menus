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
import { TranslateModule } from '@ngx-translate/core';
import * as profileAction from '../../../store/user/user.actions';

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
    TranslateModule,
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

  register(form: NgForm): void {
    if(form.form.invalid){
      return;
    }
    this.store.dispatch(profileAction.register({ data: form.form.getRawValue() }));
  }
}
