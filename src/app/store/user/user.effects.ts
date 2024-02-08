import { inject, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, map, mergeMap, Observable, of, switchMap, tap, withLatestFrom } from 'rxjs';
import { Actions, concatLatestFrom, createEffect, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { ResponseDataDto } from '../../core/models/authentication';
import { UserService } from '../../core/services/profile/user.service';
import * as userActions from './user.actions';
import * as userSelectors from './user.selectors';


@Injectable()
export class UserEffects {
  private actions$: Actions = inject(Actions);
  private userService: UserService = inject(UserService);
  private store: Store = inject(Store);

  init$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(ROOT_EFFECTS_INIT),
    mergeMap(() => [
      userActions.checkToken(),
    ]),
  ));

  login$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(userActions.loadUser),
    switchMap((action) => this.userService.login(action.data).pipe(
      map((response: ResponseDataDto) => userActions.loadUserSuccess({ response })),
      catchError((error: HttpErrorResponse) => of(userActions.loadUserFail({ error }))),
    ))),
  );

  loadUserSuccess$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(userActions.loadUserSuccess),
    map((action) => userActions.addTokenToLocalStorage({ response: action.response })),
  ));

  loadUserFail$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(userActions.loadUserFail),
  ), { dispatch: false });

  register$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(userActions.register),
    switchMap((action) => this.userService.register(action.data)
      .pipe(
        map((response: ResponseDataDto) => userActions.registerSuccess({ response })),
        catchError((error: HttpErrorResponse) => of(userActions.registerFail({ error })))
      ))
  ));

  registerSuccess$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(userActions.registerSuccess),
    map((action) => userActions.addTokenToLocalStorage({ response: action.response })),
  ));

  registerFail$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(userActions.registerFail),
  ), { dispatch: false });

  checkToken$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(userActions.checkToken),

    switchMap(() => this.userService.isTokenValid().pipe(
      map((response: ResponseDataDto) => userActions.checkTokenSuccess({ response })),
      catchError((error: HttpErrorResponse) => of(userActions.checkTokenFail({ error }))),
    )),
  ));

  addTokenToLocalStorage$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(userActions.addTokenToLocalStorage),
    tap((action) => {
      this.userService.addTokenToLocalStorage(action.response.token);
    }),
    map(() => userActions.navigateToProfile()),
  ));

  navigateToProfile$ = createEffect(() => this.actions$.pipe(
    ofType(userActions.navigateToProfile),
    concatLatestFrom(() => [
      this.store.select(userSelectors.userToken)
    ]),
    tap(([, token]: [Action, string|null]) => {
      console.log(token);
      this.userService.navigateToProfile();
    })
  ), { dispatch: false });

  removeTokenCases$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(
      userActions.logout,
      userActions.checkTokenFail
    ),
    tap(() => {
      this.userService.removeTokenFromLocalStorage();
    })
  ), { dispatch: false });

  redirectAfterLogout$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(userActions.logout),
    tap(() => {
      this.userService.navigateToLogin();
    })
  ), { dispatch: false });
}
