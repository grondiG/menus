import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RestaurantAccordionComponent } from './restaurant-accordion.component';
import { ConvertToAttributeFormatPipe } from '../../pipes/convert-to-attribute-format/convert-to-attribute-format.pipe';
import { NutrituionsModalComponent } from '../nutrituions-modal/nutrituions-modal.component';
import { NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuItem } from '../../models/restaurant.model';
import { mockMenuItem } from '../../../../mock-data/mock-data';
import { TranslateModule } from '@ngx-translate/core';
import SpyInstance = jest.SpyInstance;


describe('RestaurantAccordionComponent', () => {
  let component: RestaurantAccordionComponent;
  let fixture: ComponentFixture<RestaurantAccordionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ConvertToAttributeFormatPipe,
        NutrituionsModalComponent,
        FormsModule,
        NgForOf,
        TranslateModule.forRoot()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestaurantAccordionComponent);
    component = fixture.componentInstance;

    component.quantity = 1;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('orderItem', () => {
    let emitSpy: SpyInstance;

    beforeEach(() => {
      emitSpy = jest.spyOn(component.addItem, 'emit');
    });

    it('should emit quantity and menu item if quantity is more then 0', () => {
      const item: MenuItem = mockMenuItem();
      const quantity: number = 10;
      // const item: MenuItem = { ...mockDish };
      component.quantity = quantity;

      component.orderItem(item);

      expect(emitSpy).toHaveBeenCalledWith({ item, quantity });
    });

    it('should not call emit if quantity is 0 nad less', () => {
      const item: MenuItem = mockMenuItem();
      component.quantity = 0;

      component.orderItem(item);

      expect(emitSpy).not.toHaveBeenCalled();
    });
  });
});
