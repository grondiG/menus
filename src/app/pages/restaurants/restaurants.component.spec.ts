import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantsComponent } from './restaurants.component';
import { ActivatedRoute } from '@angular/router';
import SpyInstance = jest.SpyInstance;
import { RestaurantsStore } from './restaurants.store';
import { TranslateModule } from '@ngx-translate/core';
import {
  RestaurantCardContainerComponent
} from '../../core/components/restaurant-card-container/restaurant-card-container.component';
import { createSpyObj } from 'jest-createspyobj';
import { FilterComponent } from '../../core/components/filter/filter.component';
import { mockSearchValue } from '../../../mock-data/mock-data';

describe('RestaurantsComponent', () => {
  let component: RestaurantsComponent;
  let fixture: ComponentFixture<RestaurantsComponent>;
  let restaurantsStore: RestaurantsStore;

  const mockRestaurantsStore = createSpyObj('RestaurantsStore', [
    'loadRestaurants',
    'searchRestaurants',
  ]);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RestaurantsComponent,
        TranslateModule.forRoot(),
        RestaurantCardContainerComponent,
        FilterComponent
      ],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: {  } }},
      ]
    })
    .compileComponents();

    fixture = TestBed
      .overrideTemplate(RestaurantCardContainerComponent, '')
      .overrideTemplate(FilterComponent, '')
      .overrideProvider(RestaurantsStore, { useValue: mockRestaurantsStore })
      .createComponent(RestaurantsComponent);
    component = fixture.componentInstance;

    restaurantsStore = TestBed.inject(RestaurantsStore);
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

    it('should call searchRestaurants with params', () => {
      component.searchValue = mockSearchValue;

      component.onSearch();

      expect(spy).toHaveBeenCalledWith(mockSearchValue);
    });
  });

  describe('resetSearch', () => {
    let spy: SpyInstance;
    beforeEach(() => {
      spy = jest.spyOn(restaurantsStore, 'searchRestaurants');
    });

    it('should provide empty string to search', () => {
      component.searchValue = mockSearchValue;

      component.resetSearch();

      expect(component.searchValue).toEqual('');
    });

    it('should call searchRestaurants', () => {
      component.searchValue = 'searchValue';

      component.resetSearch();

      expect(spy).toHaveBeenCalledWith('');
    });
  });
});
