import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from "./profile-routing.module";
import { StoreModule } from "@ngrx/store";
import { profileFeature } from "../../store/profile/profile.reducer";
import { EffectsModule } from "@ngrx/effects";
import { ProfileEffects } from "../../store/profile/profile.effects";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    StoreModule.forFeature(profileFeature),
    EffectsModule.forFeature([ProfileEffects])
  ],
  exports: [StoreModule]
})
export class ProfileModule {
}
