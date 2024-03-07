import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutRoutingModule } from './checkout.routing.module';
import { GetTotalCartPricePipe } from '../../core/pipes/get-total-cart-price/get-total-cart-price.pipe';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    GetTotalCartPricePipe,
    FormsModule
  ],
  exports: [
    GetTotalCartPricePipe
  ]
})
export class CheckoutModule { }
