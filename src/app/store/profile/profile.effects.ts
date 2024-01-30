import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProfileService } from '../../core/services/profile/profile.service';
import * as profileActions from './profile.actions';
import { catchError, EMPTY, exhaustMap, map, Observable, of, switchMap, tap } from 'rxjs';
import { ProfileState } from './profile.reducer';
import { HttpErrorResponse } from '@angular/common/http';
import { Action } from '@ngrx/store';


@Injectable()
export class ProfileEffects {
  private actions$: Actions = inject(Actions);
  private profileService: ProfileService = inject(ProfileService);

  login$ = createEffect(() => this.actions$.pipe(
    ofType(profileActions.loadProfile),
    switchMap((action) => this.profileService.login(action.data).pipe(
      tap(console.log),
      map((response: ProfileState) => profileActions.loadProfileSuccess({ response })),
      catchError((error: HttpErrorResponse) => of(profileActions.loadProfileError({ error }))),
      // map(data => ({
      //   type: '[Profile] Load Profile Success', payload: {
      //     data: data.data,
      //     loading: false,
      //     isLogged: true,
      //     token: data.token
      //   }
      // })),
      // tap(data => {
      //   this.profileService.addTokenToLocalStorage(data.payload.token);
      // }),
      // catchError(() => EMPTY)
    ))),
  );

  loadProfileSuccess$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(profileActions.loadProfileSuccess),
    map((action) => profileActions.addTokenToLocalStorage({ response: action.response })),
  ));

  addTokenToLocalStorage$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(profileActions.addTokenToLocalStorage),
    tap((action) => {
      this.profileService.addTokenToLocalStorage(action.response.token);
    })
  ), { dispatch: false });

  register$ = createEffect(() => this.actions$.pipe(
    ofType(profileActions.register),
    exhaustMap(({data}) => this.profileService.register(data).pipe(
      map(data => ({
        type: '[Profile] Load Profile Success', payload: {
          data: data.data,
          loading: false,
          isLogged: true,
          token: data.token
        }
      })),
      tap(data => {
        this.profileService.addTokenToLocalStorage(data.payload.token);
      }),
      catchError(() => EMPTY)
    )),
  ));

  logout$ = createEffect(() => this.actions$.pipe(
    ofType(profileActions.logout),
    tap(() => {
      this.profileService.removeTokenFromLocalStorage();
    })
  ), { dispatch: false });
}
