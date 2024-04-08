import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersComponent } from './orders.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TranslateModule } from '@ngx-translate/core';
import SpyInstance = jest.SpyInstance;
import * as orderActions from '../../store/order/order.actions';

describe('OrdersComponent', () => {
  let component: OrdersComponent;
  let fixture: ComponentFixture<OrdersComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdersComponent, TranslateModule.forRoot()],
      providers: [provideMockStore()]
    })
    .compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(OrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    let spy: SpyInstance;
    beforeEach(() => {
      spy = jest.spyOn(store, 'dispatch');
    });

    it('should call dispatch on store with onPageLoad()', () => {
      component.ngOnInit();

      expect(spy).toHaveBeenCalledWith(orderActions.onPageLoad());
    });
  });
});
