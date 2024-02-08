import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { AsyncPipe, NgClass, NgForOf, NgIf, TitleCasePipe } from "@angular/common";
import { GetCurrentPageByUrlPipe } from "./pipes/get-current-page-by-url/get-current-page-by-url.pipe";
import { HeaderComponent } from './containers/header/header.component';
import { FooterComponent } from './containers/footer/footer.component';
import { RestaurantCardComponent } from "./components/restaurant-card/restaurant-card.component";
import { ErrorCardComponent } from './components/error-card/error-card.component';

@NgModule({
    imports: [
        HttpClientModule,
        RestaurantCardComponent,
        RouterLink,
        NgForOf,
        AsyncPipe,
        GetCurrentPageByUrlPipe,
        NgClass,
        NgIf,
        RouterLinkActive,
        TitleCasePipe
    ],
    exports: [
        HeaderComponent,
        FooterComponent,
        ErrorCardComponent,
    ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    ErrorCardComponent,
  ]
})
export class CoreModule { }
