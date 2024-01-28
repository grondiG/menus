import {inject, Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {ProfileService} from "../../core/services/profile/profile.service";
import {loadProfile, register} from "./profile.actions";
import {exhaustMap, map, switchMap} from "rxjs";


@Injectable()
export class ProfileEffects {
  private actions$: Actions = inject(Actions);
  private profileService: ProfileService = inject(ProfileService);

  login$  = createEffect(()=> this.actions$.pipe(
    ofType("[Profile] Load Profile"),
    exhaustMap( ({data}) => this.profileService.login(data)),
  ));

  register$  = createEffect(()=> this.actions$.pipe(
    ofType(register),
    exhaustMap( ({data}) => this.profileService.register(data)),
  ));




}
