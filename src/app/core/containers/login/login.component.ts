import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { HttpErrorResponse } from "@angular/common/http";
import { AsyncPipe, NgIf } from "@angular/common";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Observable } from "rxjs";
import { Store } from '@ngrx/store';
import { ModelFormGroup } from '../../types/form';
import { PreventDefaultDirective } from '../../directives/prevent-default/prevent-default.directive';
import { LoginData } from '../../models/authentication';
import * as profileAction from '../../../store/user/user.actions';
import { CoreModule } from "../../core.module";
import { userErrorSelector, userIsLoadingSelector } from "../../../store/user/user.selectors";
import { LoadingComponent } from "../../components/loading/loading/loading.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    PreventDefaultDirective,
    RouterLink,
    ReactiveFormsModule,
    NgIf,
    CoreModule,
    AsyncPipe,
    LoadingComponent
  ],
  standalone: true

})
export class LoginComponent {
  private store: Store = inject(Store);
  error$: Observable<HttpErrorResponse> = this.store.select(userErrorSelector);
  isLoading$: Observable<boolean> = this.store.select(userIsLoadingSelector);

  loginForm: ModelFormGroup<LoginData> = new FormGroup({
    login: new FormControl('', [ Validators.required ]),
    password: new FormControl('', [ Validators.required ])
  })

  login(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAsDirty();
      return;
    }

    const data: LoginData = this.loginForm.getRawValue();
    this.store.dispatch(profileAction.loadUser({ data }));
  }

  checkIfInputIsInvalid(inputName: string): boolean {
    return this.loginForm.controls[inputName].invalid && this.loginForm.controls[inputName].touched;
  }
}
