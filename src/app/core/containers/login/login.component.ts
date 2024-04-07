import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { AsyncPipe, JsonPipe, NgIf } from '@angular/common';
import { FormGroup, FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as profileAction from '../../../store/user/user.actions';
import { userIsLoadingSelector } from '../../../store/user/user.reducer';
import { LoginData } from '../../models/authentication';
import { CoreModule } from '../../core.module';
import { BanWordsValidator, CheckPasswordValidator } from '../../directives/validators';
import { PreventDefaultDirective } from '../../directives/prevent-default/prevent-default.directive';
import { CheckNamesValidator } from '../../directives/validators/check-names.directive';
import { LoadingComponent } from '../../components/loading/loading/loading.component';
import { ErrorMessageDirective } from '../../directives/error-message/error-message.directive';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormsModule,
    PreventDefaultDirective,
    RouterLink,
    NgIf,
    CoreModule,
    AsyncPipe,
    LoadingComponent,
    JsonPipe,
    BanWordsValidator,
    CheckPasswordValidator,
    CheckNamesValidator,
    ErrorMessageDirective,
    TranslateModule
  ],
  standalone: true

})
export class LoginComponent {
  private store: Store = inject(Store);
  private cd: ChangeDetectorRef = inject(ChangeDetectorRef);
  isLoading$: Observable<boolean> = this.store.select(userIsLoadingSelector);

  formValue: LoginData & { password2: string } = {
    login: '',
    password: '123',
    password2: '13',
  };

  // loginForm: ModelFormGroup<LoginData> = new FormGroup({
  //   login: new FormControl('', [ Validators.required ]),
  //   password: new FormControl('', [ Validators.required ])
  // })

  login(container: NgForm, e: SubmitEvent): void {
    const form: FormGroup = container.form;

    if (form.invalid) {
      this.cd.markForCheck();
      return;
    }
    const data: LoginData = container.form.getRawValue();
    this.store.dispatch(profileAction.loadUser({ data }));
  }
}
