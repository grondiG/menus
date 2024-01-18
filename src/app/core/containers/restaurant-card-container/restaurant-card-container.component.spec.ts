import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantCardContainerComponent } from './restaurant-card-container.component';

describe('RestaurantCardContainerComponent', () => {
  let component: RestaurantCardContainerComponent;
  let fixture: ComponentFixture<RestaurantCardContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RestaurantCardContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RestaurantCardContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
