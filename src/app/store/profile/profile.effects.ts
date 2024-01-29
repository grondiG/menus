import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ProfileService } from "../../core/services/profile/profile.service";
import { loadProfile, register } from "./profile.actions";
import { catchError, EMPTY, exhaustMap, map } from "rxjs";


@Injectable()
export class ProfileEffects {
  private actions$: Actions = inject(Actions);
  private profileService: ProfileService = inject(ProfileService);

  login$ = createEffect(() => this.actions$.pipe(
    ofType(loadProfile),
    exhaustMap(({data}) => this.profileService.login(data).pipe(
      map(data => ({
        type: '[Profile] Load Profile Success', payload: {
          data: data.data,
          loading: false,
          isLogged: true,
          token: data.token
        }
      })),
      catchError(() => EMPTY)
    ))),
  );

  register$ = createEffect(() => this.actions$.pipe(
    ofType(register),
    exhaustMap(({data}) => this.profileService.register(data).pipe(
      map(data => ({
        type: '[Profile] Load Profile Success', payload: {
          data: data.data,
          loading: false,
          isLogged: true,
          token: data.token
        }
      })),
      catchError(() => EMPTY)
    )),
  ));
}
