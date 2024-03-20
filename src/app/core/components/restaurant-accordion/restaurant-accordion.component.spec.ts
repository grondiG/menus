import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantAccordionComponent } from './restaurant-accordion.component';

describe('RestaurantAccordionComponent', () => {
  let component: RestaurantAccordionComponent;
  let fixture: ComponentFixture<RestaurantAccordionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestaurantAccordionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestaurantAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
