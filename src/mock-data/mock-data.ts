import { MenuItem, Restaurant } from '../app/core/models/restaurant.model';
import { CartItem } from '../app/core/models/order';

export const restaurantMockData: () => Restaurant = () => ({
  id: '1',
  name: 'Test Restaurant',
  description: 'A test restaurant for testing purposes',
  address: '123 Test Street',
  image: 'https://example.com/test.jpg',
  menu: [
    {
      name: 'Burger',
      price: '$10.99',
      ingredients: ['Beef patty', 'Lettuce', 'Tomato', 'Cheese', 'Bun'],
      nutrition: {
        calories: 550,
        protein: 25,
        carbohydrates: 45,
        fat: 30,
        fiber: 5
      }
    },
    {
      name: 'Salad',
      price: '$8.99',
      ingredients: ['Mixed greens', 'Chicken', 'Tomato', 'Cucumber', 'Dressing'],
      nutrition: {
        calories: 350,
        protein: 20,
        carbohydrates: 15,
        fat: 15,
        fiber: 8
      }
    }
  ]
});

export const mockDish: MenuItem = {
  name: 'test',
  price: '10',
  ingredients: ['test'],
  nutrition: {
    calories: 10,
    carbohydrates: 10,
    fat: 10,
    protein: 10,
    fiber: 10,
  }
}

export const mockMenuItem: () => MenuItem = () => ({
  name: 'test',
  price: '10',
  ingredients: ['test'],
  nutrition: {
    calories: 10,
    carbohydrates: 10,
    fat: 10,
    protein: 10,
    fiber: 10,
  }
});

export const mockCartItem: () => CartItem = () => ({
  item: mockMenuItem(),
  quantity: 1
});

export const mockCartItems: () => CartItem[] = () => ([mockCartItem()]);

export const mockSearchValue: 'searchValue' = 'searchValue';

