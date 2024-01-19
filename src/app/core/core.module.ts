import { NgModule } from '@angular/core';
import { HeaderComponent } from './containers/header/header.component';
import { FooterComponent } from './containers/footer/footer.component';
import { HttpClientModule } from "@angular/common/http";
import { RestaurantCardComponent } from "./components/restaurant-card/restaurant-card.component";
import { RouterLink } from "@angular/router";
import { AsyncPipe, NgClass, NgForOf, NgIf } from "@angular/common";
import { GetCurrentPageByUrlPipe } from "./pipes/get-current-page-by-url/get-current-page-by-url.pipe";

@NgModule({
  imports: [
    HttpClientModule,
    RestaurantCardComponent,
    RouterLink,
    NgForOf,
    AsyncPipe,
    GetCurrentPageByUrlPipe,
    NgClass,
    NgIf
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
  ]
})
export class CoreModule { }
