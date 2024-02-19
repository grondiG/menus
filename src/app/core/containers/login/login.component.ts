import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, JsonPipe, NgIf } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { PreventDefaultDirective } from '../../directives/prevent-default/prevent-default.directive';
import { LoginData } from '../../models/authentication';
import { CoreModule } from '../../core.module';
import { userIsLoadingSelector } from '../../../store/user/user.reducer';
import { LoadingComponent } from '../../components/loading/loading/loading.component';

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
    JsonPipe
  ],
  standalone: true

})
export class LoginComponent {
  private store: Store = inject(Store);
  isLoading$: Observable<boolean> = this.store.select(userIsLoadingSelector);

  formValue: LoginData = {
    login: '',
    password: '123'
  };

  // loginForm: ModelFormGroup<LoginData> = new FormGroup({
  //   login: new FormControl('', [ Validators.required ]),
  //   password: new FormControl('', [ Validators.required ])
  // })

  login(form: NgForm, e: SubmitEvent): void {
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
