import { MenuItem } from './restaurant.model';

export interface CartItem {
  item: MenuItem,
  quantity: number,
}

export interface Order {
  id: string;
  items: CartItem[];
  date: Date;
  status: string;
  total: number;
}

export interface ShippingForm {
  name: string;
  address: string;
  city: string;
  country: string;
  zip: string;
}

export interface OrderData {
  cart: CartItem[];
  totalPrice: number;
}

export interface OrderShippingData extends OrderData {
  shipping: ShippingForm;
}
