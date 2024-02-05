import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { UserService } from '../../core/services/profile/user.service';
import * as userActions from './user.actions';
import { catchError, map, Observable, of, switchMap, tap } from 'rxjs';
import { UserState } from './user.reducer';
import { HttpErrorResponse } from '@angular/common/http';
import { Action } from '@ngrx/store';
import { ToastrService } from "ngx-toastr";


@Injectable()
export class UserEffects {
  private actions$: Actions = inject(Actions);
  private profileService: UserService = inject(UserService);
  private toastr: any = inject(ToastrService);

  private wasTokenValid: boolean = false;

  init$ = createEffect(() => this.actions$.pipe(
    ofType(ROOT_EFFECTS_INIT),
    switchMap(() => this.profileService.isTokenValid().pipe(
      map((response: UserState) => {
        this.wasTokenValid = true;
        return userActions.loadUserSuccess({ response });
      }),
      catchError((error: HttpErrorResponse) => of(userActions.logout())),
    )),
  ));

  login$ = createEffect(() => this.actions$.pipe(
    ofType(userActions.loadUser),
    switchMap((action) => this.profileService.login(action.data).pipe(
      tap(console.log),
      map((response: UserState) => userActions.loadUserSuccess({ response })),
      catchError((error: HttpErrorResponse) => of(userActions.loadUserError({ error }))),
    ))),
  );

  loadProfileSuccess$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(userActions.loadUserSuccess),
    map((action) => userActions.addTokenToLocalStorage({ response: action.response })),
  ));

  loadUserError$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(userActions.loadUserError),
    tap((action) => {
      this.toastr.error(action.error.message, 'Error');
    }),
  ), { dispatch: false });

  addTokenToLocalStorage$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(userActions.addTokenToLocalStorage),
    tap((action) => {
      this.profileService.addTokenToLocalStorage(action.response.token);
    }),
    map(() => userActions.navigateToProfile()),
  ));

  navigateToProfile$ = createEffect(() => this.actions$.pipe(
    ofType(userActions.navigateToProfile),
    tap(() => {
      if(!this.wasTokenValid) {
        this.profileService.navigateToProfile();
      }
    })
  ), { dispatch: false });

  register$ = createEffect(() => this.actions$.pipe(
    ofType(userActions.register),
    tap(console.log),
    map((response: UserState) => userActions.loadUserSuccess({ response })),
    catchError((error: HttpErrorResponse) => of(userActions.loadUserError({ error })))
  ));

  logout$ = createEffect(() => this.actions$.pipe(
    ofType(userActions.logout),
    tap(() => {
      this.profileService.removeTokenFromLocalStorage();
    })
  ), { dispatch: false });
}
