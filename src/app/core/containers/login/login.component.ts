import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { AsyncPipe, JsonPipe, NgIf } from '@angular/common';
import { FormGroup, FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { PreventDefaultDirective } from '../../directives/prevent-default/prevent-default.directive';
import { LoginData } from '../../models/authentication';
import { CoreModule } from '../../core.module';
import { userIsLoadingSelector } from '../../../store/user/user.reducer';
import { LoadingComponent } from '../../components/loading/loading/loading.component';
import { BanWordsValidator, CheckPasswordValidator } from '../../directives/validators';
import { CheckNamesValidator } from '../../directives/validators/check-names.directive';

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
    CheckNamesValidator
  ],
  standalone: true

})
export class LoginComponent {
  private store: Store = inject(Store);
  private cd: ChangeDetectorRef = inject(ChangeDetectorRef);
  isLoading$: Observable<boolean> = this.store.select(userIsLoadingSelector);

  bannedWords: string[] = ['asd', '123', 'a12ds', 'test'];

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
    // Object.keys(container.controls).forEach((controlName: string) => container.controls[controlName].markAsDirty());
    console.log(form);

    // if (this.loginForm.invalid) {
    //   this.loginForm.markAsDirty();
    //   return;
    // }
    //
    // const data: LoginData = this.loginForm.getRawValue();
    // this.store.dispatch(profileAction.loadUser({ data }));
  }

  // checkIfInputIsInvalid(inputName: string): boolean {
  //   return this.loginForm.controls[inputName].invalid && this.loginForm.controls[inputName].touched;
  // }
}
