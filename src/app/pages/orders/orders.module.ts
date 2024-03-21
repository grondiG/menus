import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { orderFeature } from '../../store/order/order.reducer';
import { OrderEffects } from '../../store/order/order.effects';
import { OrdersRoutingModule } from './orders-routing.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(orderFeature),
    EffectsModule.forFeature([OrderEffects]),
    OrdersRoutingModule
  ],
  exports: [StoreModule]
})
export class OrdersModule { }
