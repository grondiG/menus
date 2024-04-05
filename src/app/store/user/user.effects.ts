import { inject, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, map, mergeMap, Observable, of, switchMap, tap } from 'rxjs';
import { Actions, createEffect, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { ResponseDataDto } from '../../core/models/authentication';
import { UserService } from '../../core/services/profile/user.service';
import * as userActions from './user.actions';
import * as appStateActions from '../app-state/app-state.actions';


@Injectable()
export class UserEffects {
    private actions$: Actions = inject(Actions);
    private userService: UserService = inject(UserService);
    private router: Router = inject(Router);

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
        map((action) => appStateActions.setError(action.error)
        )));

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

    checkTokenSuccess$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(userActions.checkTokenSuccess),
        map((action) => userActions.userInitialized({ userId: action.response.data.id })),
    ));

    addTokenToLocalStorage$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(userActions.addTokenToLocalStorage),
        tap((action) => {
          localStorage.setItem('userToken', action.response.token);
        }),
        map((action) => userActions.userInitialized({ userId: action.response.data.id })),
    ));

    navigateToProfile$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(
            userActions.registerSuccess,
            userActions.loadUserSuccess
        ),
        tap(() => {
          this.router.navigate(['/home']);
        })
    ), { dispatch: false });

    removeTokenCases$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(
            userActions.logout,
            userActions.checkTokenFail
        ),
        tap(() => {
          localStorage.removeItem('userToken');
        })
    ), { dispatch: false });

    redirectAfterLogout$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(userActions.logout),
        tap(() => {
          this.router.navigate(['profile','login']);
        })
    ), { dispatch: false });

    // userInitialized$: Observable<Action> = createEffect(() => this.actions$.pipe(
    //     ofType(userActions.userInitialized),
    //     map(()=> getOrders())
    // ));
}
