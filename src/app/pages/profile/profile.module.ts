import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { userFeature } from '../../store/user/user.reducer';
import { UserEffects } from '../../store/user/user.effects';
import { ProfileRoutingModule } from './profile-routing.module';

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
