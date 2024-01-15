
export interface Restaurant {
  id: string;
  name: string;
  description: string;
  address: string;
  image: string;
  menu: MenuItem[];
}

export interface MenuItem {
  name: string;
  price: string;
  ingredients: string[];
  nutrition: Nutrition;
}

export interface Nutrition {
  calories: number;
  protein: number;
  carbohydrates: number;
  fat: number;
  fiber: number;
}
