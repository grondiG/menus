import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import SpyInstance = jest.SpyInstance;
import { NgForm } from '@angular/forms';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterComponent, RouterTestingModule, TranslateModule.forRoot()],
      providers: [provideMockStore()],
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('register', () => {
    let spy: SpyInstance;

    beforeEach(() => {
      spy = jest.spyOn(store, 'dispatch');
    });

    it('should call store', () => {
      let mockForm: NgForm = {
        form: {
          invalid: false,
          getRawValue: () => {}
        }
      } as NgForm;

      component.register(mockForm);

      expect(spy).toHaveBeenCalled();
    });

    it('should not call store if form is invalid', () => {
      let mockForm: NgForm = {
        form: {
          invalid: true
        }
      } as NgForm;

      component.register(mockForm);

      expect(spy).not.toHaveBeenCalled();
    });
  })
});
