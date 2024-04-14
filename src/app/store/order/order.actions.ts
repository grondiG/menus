import { createAction, props } from '@ngrx/store';
import { OrderDto } from '../../core/models';
import { ROOT_EFFECTS_INIT } from '@ngrx/effects';

export enum OrderActions {
  AddOrder = '[Order] Add order',
  AddOrderSuccess = '[Order] Add order success',
  AddOrderFailure = '[Order] Add order failure',
  RedirectToOrders = '[Order] Redirect to orders',
  RemoveOrder = '[Order] Remove order',
  RemoveOrderSuccess = '[Order] Remove order success',
  RemoveOrderFailure = '[Order] Remove order failure',
  GetOrders = '[Order] Get orders',
  GetOrdersSuccess = '[Order] Get orders success',
  GetOrdersFailure = '[Order] Get orders failure',
  OnPageLoad = ROOT_EFFECTS_INIT,
}

export const addOrder = createAction(OrderActions.AddOrder, props<{ order: OrderDto }>());
export const addOrderSuccess = createAction(OrderActions.AddOrderSuccess, props<{ order: OrderDto }>());
export const addOrderFailure = createAction(OrderActions.AddOrderFailure, props<{ error: any }>());
export const redirectToOrders = createAction(OrderActions.RedirectToOrders);
export const removeOrder = createAction(OrderActions.RemoveOrder, props<{ id: string }>());
export const removeOrderSuccess = createAction(OrderActions.RemoveOrderSuccess, props<{ id: string }>());
export const removeOrderFailure = createAction(OrderActions.RemoveOrderFailure, props<{ error: any }>());
export const getOrders = createAction(OrderActions.GetOrders);
export const getOrdersSuccess = createAction(OrderActions.GetOrdersSuccess, props<{ orders: OrderDto[] }>());
export const getOrdersFailure = createAction(OrderActions.GetOrdersFailure, props<{ error: any }>());
export const onPageLoad = createAction(OrderActions.OnPageLoad);
