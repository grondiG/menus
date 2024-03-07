import { inject, Injectable } from '@angular/core';
import { catchError, from, map, Observable, of, switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';
import { Action } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpErrorResponse } from '@angular/common/http';
import { OrderDto } from '../../core/models/order';
import * as fromOrders from './order.actions';
import * as appStateActions from '../app-state/app-state.actions';
import * as fromCart from '../cart/cart.actions';
import { OrdersService } from '../../core/services/orders/orders.service';

@Injectable()
export class OrderEffects {
  private actions$: Actions = inject(Actions);
  private ordersService: OrdersService = inject(OrdersService);
  private router: Router = inject(Router);

  addOrder$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(fromOrders.addOrder),
    switchMap((action) => this.ordersService.order(action.order).pipe(
      map((response: OrderDto) => fromOrders.addOrderSuccess({ order: response })),
      catchError((error: HttpErrorResponse) => of(fromOrders.addOrderFailure({ error }))),
    ))
  ));

  addOrderSuccess$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(fromOrders.addOrderSuccess),
    map(() => fromOrders.redirectToOrders())
  ));

  addOrderFailure$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(fromOrders.addOrderFailure),
    map((action) => appStateActions.setError(action.error))
  ));

  redirectToOrders$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(fromOrders.redirectToOrders),
    tap(()=>{
      this.router.navigate(['/orders']);
    }),
    map(() => fromCart.clearCart())
  ));
}
