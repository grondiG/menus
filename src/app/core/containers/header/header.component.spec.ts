import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import SpyInstance = jest.SpyInstance;
import { logout } from '../../../store/user/user.actions';
import { TranslateModule } from '@ngx-translate/core';
import { mockLanguage } from '../../../../mock-data';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let store: MockStore<{ logout: () => {} }>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ RouterModule, TranslateModule.forRoot() ],
      declarations: [ HeaderComponent ],
      providers: [
        provideMockStore(),
        { provide: ActivatedRoute, useValue: { snapshot: {} } }
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    store = TestBed.inject(MockStore);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('toggleCart', () => {
    it('should toggle cart', () => {
      component.toggleCart();
      const result: Promise<boolean> = lastValueFrom(component.isCartOpen$);
      const expectedResult: boolean = !result;
      expect(result).resolves.toBe(expectedResult);
    });
  });

  describe('logout', () => {
    let spy: SpyInstance;
    beforeEach(() => {
      spy = jest.spyOn(store, 'dispatch');
    });
    it('should dispatch logout action', () => {
      component.logout();

      const expectedResult = logout();

      expect(spy).toHaveBeenCalledWith(expectedResult);
    });
  });

  describe('setLang', () => {
    it('should set language', () => {
      const lang: string = mockLanguage();
      component.setLang(lang);

      const result: string = component.currentLang;
      expect(result).toBe(lang);
    });
  });
});
