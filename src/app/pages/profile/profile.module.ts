import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile-routing.module';
import { StoreModule } from '@ngrx/store';
import { profileFeature } from '../../store/profile/profile.reducer';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    ReactiveFormsModule,
    StoreModule.forFeature(profileFeature),
  ],
  exports: [StoreModule]
})
export class ProfileModule { }
