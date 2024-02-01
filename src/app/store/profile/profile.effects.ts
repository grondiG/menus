import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProfileService } from '../../core/services/profile/profile.service';
import * as profileActions from './profile.actions';
import { catchError, map, Observable, of, switchMap, tap } from 'rxjs';
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
    }),
    map(() => profileActions.navigateToProfile()),
  ));

  navigateToProfile$ = createEffect(() => this.actions$.pipe(
    ofType(profileActions.navigateToProfile),
    tap(() => {
      this.profileService.navigateToProfile();
    })
  ), { dispatch: false });

  register$ = createEffect(() => this.actions$.pipe(
    ofType(profileActions.register),
    tap(console.log),
    map((response: ProfileState) => profileActions.loadProfileSuccess({ response })),
    catchError((error: HttpErrorResponse) => of(profileActions.loadProfileError({ error })))
  ));

  logout$ = createEffect(() => this.actions$.pipe(
    ofType(profileActions.logout),
    tap(() => {
      this.profileService.removeTokenFromLocalStorage();
    })
  ), { dispatch: false });
}
