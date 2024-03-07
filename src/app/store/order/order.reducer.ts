import { OrderDto } from '../../core/models/order';
import { createFeature, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import * as fromOrders from './order.actions';

export interface OrderState {
  orders: OrderDto[];
  loading: boolean;
}

export const initialState: OrderState = {
  orders: [],
  loading: false,
};

export const orderFeatureKey: "order" = "order" as const;

export const orderFeature = createFeature({
  name: orderFeatureKey,
  reducer: createReducer(
    initialState,
    on(
      fromOrders.addOrder,
      (state: OrderState) => ({
        ...state,
        loading: true
      })
    ),
    on(
      fromOrders.addOrderSuccess,
      (state: OrderState, action) => ({
        ...state,
        loading: false,
        orders: [...state.orders, action.order]
      })
    ),
    on(
      fromOrders.addOrderFailure,
      (state: OrderState) => ({
        ...state,
        loading: false
      })
    ),
  )
});

const orderFeatureSelector = createFeatureSelector<OrderState>(orderFeatureKey);

export const orderSelector = createSelector(
  orderFeatureSelector,
  (orders) => orders
);

export const orderLoadingSelector = createSelector(
  orderFeatureSelector,
  (orders) => orders.loading
);

export const {
  name,
  reducer
} = orderFeature;
