import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { NgForm } from '@angular/forms';
import SpyInstance = jest.SpyInstance;

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ LoginComponent, RouterTestingModule, TranslateModule.forRoot() ],
      providers: [ provideMockStore() ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('login', () => {
    let spy: SpyInstance;
    beforeEach(() => {
      spy = jest.spyOn(store, 'dispatch');
    });

    it('should call store', () => {
        const mockForm: NgForm = {
          form: {
            invalid: false,
            getRawValue: () => {}
          }
        } as NgForm;

        component.login(mockForm, {} as SubmitEvent);
        expect(spy).toHaveBeenCalled();
    });

    it('if form is invalid should not call store', () => {
        const mockForm: NgForm = {
          form: {
            invalid: true
          }
        } as NgForm;

        component.login(mockForm, {} as SubmitEvent);
        expect(spy).not.toHaveBeenCalled();
    });
  })
});
