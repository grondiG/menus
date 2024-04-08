import SpyInstance = jest.SpyInstance;
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TranslateModule } from '@ngx-translate/core';
import { mockForm, mockInvalidForm } from '../../../../mock-data';
import { LoginComponent } from './login.component';

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
        component.login(mockForm(), {} as SubmitEvent);
        expect(spy).toHaveBeenCalled();
    });

    it('if form is invalid should not call store', () => {
        component.login(mockInvalidForm(), {} as SubmitEvent);

        expect(spy).not.toHaveBeenCalled();
    });
  })
});
