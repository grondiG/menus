import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { AsyncPipe, JsonPipe, NgForOf, NgIf, TitleCasePipe } from '@angular/common';
import {
  FormArray, FormBuilder,
  FormControl,
  FormGroup, FormRecord,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  UntypedFormGroup
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { debounce, debounceTime, distinctUntilChanged, Observable, tap } from 'rxjs';
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
import { BasedOn } from '../../types/form';
import { UserSkillsService } from './user-skills.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

interface Phone {
  label: string;
  number: string;
}

type FormType = LoginData & {
  password2: string,
  phoneGroup: Phone[],
};

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    PreventDefaultDirective,
    RouterLink,
    NgIf,
    CoreModule,
    AsyncPipe,
    LoadingComponent,
    JsonPipe,
    TranslateModule,
    NgForOf,
    TitleCasePipe
  ],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  private store: Store = inject(Store);
  private cd: ChangeDetectorRef = inject(ChangeDetectorRef);
  private destroy: DestroyRef = inject(DestroyRef);
  private skillsService: UserSkillsService = inject(UserSkillsService);
  private fb: FormBuilder = inject(FormBuilder);

  isLoading$: Observable<boolean> = this.store.select(userIsLoadingSelector);
  skills$!: Observable<string[]>;

  phoneLabels: string[] = ['main', 'mobile', 'work'];

  searchControl: FormControl<string> = new FormControl<string>('');

  // form = new FormGroup({
  //   login: new FormControl<string>({ value: null, disabled: true }, { nonNullable: true }),
  //   password: new FormControl<string>(null),
  //   password2: new FormControl<string>(null),
  //   phones: new FormArray([
  //     // new FormControl('123456789'),
  //   ]),
  //   skills: new FormGroup<{ [key: string]: FormControl<boolean> }>({}),
  //   skills: new FormRecord<FormControl<boolean>>({}),
  // });

  form = this.fb.group({
    login: this.fb.nonNullable.control<string>({ value: null, disabled: true }),
    password: null,
    password2: null,
    phones: this.fb.array<FormGroup<BasedOn<Phone>>>([
      this.fb.group({
        label: this.phoneLabels[0],
        number: '+48'
      })
    ]),
    // skills: new FormGroup<{ [key: string]: FormControl<boolean> }>({}),
    skills: this.fb.record<boolean>({}),
  });

  ngOnInit(): void {
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntilDestroyed(this.destroy)
    ).subscribe(console.log)

    this.skills$ = this.skillsService.getSkills().pipe(
      tap((skills: string[]) => this.buildSkills(skills))
    );
  }

  // loginForm: ModelFormGroup<LoginData> = new FormGroup({
  //   login: new FormControl('', [ Validators.required ]),
  //   password: new FormControl('', [ Validators.required ])
  // })

  // login(): void {
  //   const form: FormGroup = container.form;
  //
  //   if (form.invalid) {
  //     this.cd.markForCheck();
  //     return;
  //   }
  //   const data: LoginData = container.form.getRawValue();
  //   this.store.dispatch(profileAction.loadUser({ data }));
  // }

  submit(): void {
    console.log(this.searchControl.value);
    console.log(this.form.value);
    console.log(this.form.getRawValue());
  }

  addPhone(): void {
    // this.form.controls.phones.push(new FormControl<string>('+48'));
    // this.form.controls.phones.insert(0, new FormControl<string>('+48'));


    // this.form.controls.phones.insert(0, new FormGroup<BasedOn<Phone>>({
    //   label: new FormControl<string>(this.phoneLabels[0]),
    //   number: new FormControl<string>('+48'),
    // }));

    const newPhone: FormGroup<BasedOn<Phone>> = this.fb.group({
      label: this.phoneLabels[0],
      number: '+48'
    });

    this.form.controls.phones.insert(0, newPhone);
  }

  removePhone(index: number): void {
    this.form.controls.phones.removeAt(index);
  }

  private buildSkills(skills: string[]): void {
    skills.forEach((skill: string) => {
      this.form.controls.skills.addControl(skill, new FormControl<boolean>(false, { nonNullable: true }));
    });
  }
}
