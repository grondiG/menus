import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RestaurantComponent } from './restaurant.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import SpyInstance = jest.SpyInstance;
import { mockCartItem } from '../../../../mock-data/mock-data';
import { addToCart } from '../../../store/cart/cart.actions';

describe('RestaurantComponent', () => {
  let component: RestaurantComponent;
  let fixture: ComponentFixture<RestaurantComponent>;
  let store: MockStore<{ logout: () => {} }>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestaurantComponent, RouterTestingModule],
      providers: [provideMockStore()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestaurantComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('addToCart', () => {
    let spy: SpyInstance;
    beforeEach(() => {
      spy = jest.spyOn(store, 'dispatch');
    });
    it('should add item to cart', () => {
      component.addToCart(mockCartItem());
      const expectedResult = addToCart({ item: mockCartItem() });
      expect(spy).toHaveBeenCalledWith(expectedResult);
    });
  });
});
