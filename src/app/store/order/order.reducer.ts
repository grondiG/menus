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
    on(
      fromOrders.getOrders,
      (state: OrderState) => ({
        ...state,
        loading: true
      })
    ),
    on(
      fromOrders.getOrdersSuccess,
      (state: OrderState, action) => ({
        loading: false,
        orders: action.orders
      })
    ),
    on(
      fromOrders.getOrdersFailure,
      () => ({
        loading: false,
        orders: []
      })
    )
  )
});

const orderFeatureSelector = createFeatureSelector<OrderState>(orderFeatureKey);

export const orderSelector = createSelector(
  orderFeatureSelector,
  (orders: OrderState) => orders
);

export const orderLoadingSelector = createSelector(
  orderFeatureSelector,
  (orders: OrderState) => {
      return orders.loading
  }
);

export const orderDataSelector = createSelector(
    orderFeatureSelector,
    (orders: OrderState) => {
        console.log('Selector is being called!', orders);
        return orders?.orders;
    }
);

export const {
  name,
  reducer
} = orderFeature;
