import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantsComponent } from './restaurants.component';
import { ActivatedRoute } from '@angular/router';
import SpyInstance = jest.SpyInstance;
import { RestaurantsStore } from './restaurants.store';

describe('RestaurantsComponent', () => {
  let component: RestaurantsComponent;
  let fixture: ComponentFixture<RestaurantsComponent>;
  let restaurantsStore: RestaurantsStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestaurantsComponent],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: {  } }},
        RestaurantsStore
      ]
    })
    .compileComponents();

    restaurantsStore = TestBed.inject(RestaurantsStore);
    fixture = TestBed.createComponent(RestaurantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onSearch', () => {
    let spy: SpyInstance;
    beforeEach(() => {
      spy = jest.spyOn(restaurantsStore, 'searchRestaurants');
    });
    it('should call searchRestaurants', () => {
      const searchValue: 'searchValue' = 'searchValue';
      component.searchValue = searchValue;

      component.onSearch();

      expect(spy).toHaveBeenCalledWith(searchValue);
    });
  });

  describe('resetSearch', () => {
    let spy: SpyInstance;
    beforeEach(() => {
      spy = jest.spyOn(restaurantsStore, 'searchRestaurants');
    });
    it('should call searchRestaurants', () => {
      component.searchValue = 'searchValue';

      component.resetSearch();

      expect(spy).toHaveBeenCalledWith('');
    });
  });
});
