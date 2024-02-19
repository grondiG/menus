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
