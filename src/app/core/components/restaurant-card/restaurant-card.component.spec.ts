import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantCardComponent } from './restaurant-card.component';
import { restaurantMockData } from '../../../mock-data';
import { RouterTestingModule } from '@angular/router/testing';

describe('RestaurantCardComponent', () => {
  let component: RestaurantCardComponent;
  let fixture: ComponentFixture<RestaurantCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestaurantCardComponent, RouterTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestaurantCardComponent);
    component = fixture.componentInstance;
    component.restaurant = restaurantMockData;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
