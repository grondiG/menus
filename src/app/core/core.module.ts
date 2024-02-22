import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AsyncPipe, CurrencyPipe, NgClass, NgForOf, NgIf, TitleCasePipe } from '@angular/common';
import { GetCurrentPageByUrlPipe } from './pipes/get-current-page-by-url/get-current-page-by-url.pipe';
import { GetNumberPricePipe } from './pipes/get-number-price/get-number-price.pipe';
import { GetTotalCartPricePipe } from './pipes/get-total-cart-price/get-total-cart-price.pipe';
import { HeaderComponent } from './containers/header/header.component';
import { FooterComponent } from './containers/footer/footer.component';
import { RestaurantCardComponent } from './components/restaurant-card/restaurant-card.component';
import { ErrorCardComponent } from './components/error-card/error-card.component';
import { ErrorModalComponent } from './components/modal/error-modal.component';
import { CartComponent } from './containers/cart/cart.component';
import { FormInputErrorPipe } from './pipes/form-input-error/form-input-error-required.pipe';
import { FormErrorPipe } from './pipes/form-error/form-error.pipe';

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
        CurrencyPipe
    ],
  exports: [
    HeaderComponent,
    FooterComponent,
    ErrorCardComponent,
    ErrorModalComponent,
    FormInputErrorPipe,
    FormErrorPipe,
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    ErrorCardComponent,
    ErrorModalComponent,
    CartComponent,
    GetNumberPricePipe,
    GetTotalCartPricePipe,
    FormInputErrorPipe,
    FormErrorPipe,
  ]
})
export class CoreModule {
}
