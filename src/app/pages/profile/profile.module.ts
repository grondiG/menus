import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from "./profile-routing.module";
import { StoreModule } from "@ngrx/store";
import { userFeature } from "../../store/user/user.reducer";
import { EffectsModule } from "@ngrx/effects";
import { UserEffects } from "../../store/user/user.effects";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    StoreModule.forFeature(userFeature),
    EffectsModule.forFeature([UserEffects])
  ],
  exports: [StoreModule]
})
export class ProfileModule {
}
