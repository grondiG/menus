import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileComponent } from './profile.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ActivatedRoute } from '@angular/router';
import * as profileActions from '../../store/user/user.actions';
import SpyInstance = jest.SpyInstance;

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileComponent],
      providers: [provideMockStore(), { provide: ActivatedRoute, useValue: { snapshot: {  } }}],
    })
    .compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('logout', () => {
    let spy: SpyInstance;

    beforeEach(() => {
      spy = jest.spyOn(store, 'dispatch');
    });

    it('should dispatch logout action', () => {
      component.logout();
      const expectedResult = profileActions.logout();

      expect(spy).toHaveBeenCalledWith(expectedResult);
    });
  });
});
