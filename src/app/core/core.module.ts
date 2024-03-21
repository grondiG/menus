import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AsyncPipe, CurrencyPipe, NgClass, NgForOf, NgIf, TitleCasePipe } from '@angular/common';
import { GetCurrentPageByUrlPipe } from './pipes/get-current-page-by-url/get-current-page-by-url.pipe';
import { GetNumberPricePipe } from './pipes/get-number-price/get-number-price.pipe';
import { GetTotalCartPricePipe } from './pipes/get-total-cart-price/get-total-cart-price.pipe';
import { GetErrorInfoPipe } from './pipes/get-error-info/get-error-info.pipe';
import { GetFormStatusForPipe } from './pipes/get-form-status/get-form-status.pipe';
import { HeaderComponent } from './containers/header/header.component';
import { FooterComponent } from './containers/footer/footer.component';
import { RestaurantCardComponent } from './components/restaurant-card/restaurant-card.component';
import { ErrorCardComponent } from './components/error-card/error-card.component';
import { ErrorModalComponent } from './components/modal/error-modal.component';
import { CartComponent } from './containers/cart/cart.component';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { PendingComponent } from './components/pending/pending.component';

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
    TitleCasePipe,
    CurrencyPipe,
    GetTotalCartPricePipe,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    ErrorCardComponent,
    ErrorModalComponent,
    ErrorMessageComponent,
    GetFormStatusForPipe,
    GetNumberPricePipe,
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    ErrorCardComponent,
    ErrorModalComponent,
    CartComponent,
    GetNumberPricePipe,
    ErrorMessageComponent,
    GetErrorInfoPipe,
    GetFormStatusForPipe,
    PendingComponent,
  ]
})
export class CoreModule {
}
