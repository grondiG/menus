import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import { RestaurantDescriptionPipe } from './pipes/restaurant-description/restaurant-description.pipe';
import { RestaurantCardComponent } from './components/restaurant-card/restaurant-card.component';
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import { PreventDefaultDirective } from './directives/prevent-default/prevent-default.directive';
import { NutrituionsModalComponent } from './components/nutrituions-modal/nutrituions-modal.component';
import { TimerComponent } from './components/timer/timer.component';
@NgModule({
  imports: [
    RouterModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  declarations: [
    RestaurantDescriptionPipe,
    RestaurantCardComponent,
    PreventDefaultDirective,
    NutrituionsModalComponent,
    TimerComponent
  ],
  exports: [
    RouterModule,
    RestaurantDescriptionPipe,
    RestaurantCardComponent,
    CommonModule,
    ReactiveFormsModule,
    PreventDefaultDirective,
    NutrituionsModalComponent,
    TimerComponent
  ]
})
export class SharedModule { }
