import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CheckoutRoutingModule } from './checkout.routing.module';
import { GetTotalCartPricePipe } from '../../core/pipes/get-total-cart-price/get-total-cart-price.pipe';
import { CheckoutComponent } from './checkout.component';
import { LoadingComponent } from '../../core/components/loading/loading/loading.component';
import { ErrorMessageDirective } from '../../core/directives/error-message/error-message.directive';
import { TranslateModule } from '@ngx-translate/core';
import { CoreModule } from '../../core/core.module';

@NgModule({
  declarations: [
    CheckoutComponent
  ],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    GetTotalCartPricePipe,
    FormsModule,
    LoadingComponent,
    ErrorMessageDirective,
    TranslateModule,
    CoreModule
  ],
  exports: [
    GetTotalCartPricePipe
  ]
})
export class CheckoutModule { }
