import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, of, switchMap, tap } from 'rxjs';
import { Action } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ordersActions from './order.actions';
import * as appStateActions from '../app-state/app-state.actions';
import * as cartActions from '../cart/cart.actions';
import { OrderDto } from '../../core/models/order';
import { OrdersService } from '../../core/services/orders/orders.service';

@Injectable()
export class OrderEffects {
    private actions$: Actions = inject(Actions);
    private ordersService: OrdersService = inject(OrdersService);
    private router: Router = inject(Router);

    onPageLoad$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(ordersActions.onPageLoad),
        map(() => ordersActions.getOrders())
    ));

    addOrder$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(ordersActions.addOrder),
        switchMap((action) => this.ordersService.order(action.order).pipe(
            map((response: OrderDto) => ordersActions.addOrderSuccess({ order: response })),
            catchError((error: HttpErrorResponse) => of(ordersActions.addOrderFailure({ error }))),
        ))
    ));

    addOrderSuccess$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(ordersActions.addOrderSuccess),
        map(() => ordersActions.redirectToOrders())
    ));

    addOrderFailure$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(ordersActions.addOrderFailure),
        map((action) => appStateActions.setError(action.error))
    ));

    redirectToOrders$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(ordersActions.redirectToOrders),
        tap(() => {
            this.router.navigate([ '/orders' ]);
        }),
        map(() => cartActions.clearCart())
    ));

    getOrders$: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType(ordersActions.getOrders),
            switchMap(() =>
                this.ordersService.getOrdersForUserById().pipe(
                    map((response: OrderDto[]) => ordersActions.getOrdersSuccess({ orders: response })),
                    catchError((error: HttpErrorResponse) => of(ordersActions.getOrdersFailure({ error })))
                )
            )
        )
    );

    getOrdersFailure$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(ordersActions.getOrdersFailure),
        map((action) => appStateActions.setError(action.error))
    ));
}
