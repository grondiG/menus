import { NgModule } from '@angular/core';
import { HeaderComponent } from './containers/header/header.component';
import { FooterComponent } from './containers/footer/footer.component';
import { SharedModule } from "../shared/shared.module";
import { HttpClientModule } from "@angular/common/http";
import { RestaurantCardContainerComponent } from './containers/restaurant-card-container/restaurant-card-container.component';
import { RestaurantAccordionComponent } from './containers/restaurant-accordion/restaurant-accordion.component';

@NgModule({
  imports: [
    SharedModule,
    HttpClientModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    RestaurantCardContainerComponent,
    RestaurantAccordionComponent
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    RestaurantCardContainerComponent,
    RestaurantAccordionComponent,
  ]
})
export class CoreModule { }
