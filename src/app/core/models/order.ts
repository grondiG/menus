import { MenuItem } from './restaurant.model';

export interface CartItem {
  item: MenuItem,
  quantity: number,
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
  isLoading?: boolean;
}

export interface OrderDto extends OrderData {
  id?: string;
  userId: string;
  shipping: ShippingForm;
  date?: Date;
}
