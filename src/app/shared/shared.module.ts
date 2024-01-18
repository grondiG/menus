import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RestaurantDescriptionPipe } from './pipes/restaurant-description/restaurant-description.pipe';
import { RestaurantCardComponent } from './components/restaurant-card/restaurant-card.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PreventDefaultDirective } from './directives/prevent-default/prevent-default.directive';
import { NutrituionsModalComponent } from './components/nutrituions-modal/nutrituions-modal.component';
import { FilterComponent } from './components/filter/filter.component';
import { ConvertToAttributeFormatPipe } from './pipes/convert-to-attribute-format/convert-to-attribute-format.pipe';

@NgModule({
  imports: [
    RouterModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
  ],
  declarations: [
    RestaurantDescriptionPipe,
    RestaurantCardComponent,
    PreventDefaultDirective,
    NutrituionsModalComponent,
    FilterComponent,
    ConvertToAttributeFormatPipe
  ],
  exports: [
    RouterModule,
    RestaurantDescriptionPipe,
    RestaurantCardComponent,
    CommonModule,
    ReactiveFormsModule,
    PreventDefaultDirective,
    NutrituionsModalComponent,
    FilterComponent,
    ConvertToAttributeFormatPipe
  ]
})
export class SharedModule {
}
