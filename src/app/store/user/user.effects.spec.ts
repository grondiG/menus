import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { UserEffects } from './user.effects';
import * as userActions from './user.actions';
import { ResponseDataDto } from '../../core/models';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../../core/services/profile/user.service';
import { EffectsMetadata, getEffectsMetadata } from '@ngrx/effects';
import { Router } from '@angular/router';
import * as appStateActions from '../app-state/app-state.actions';
import {
  mockError,
  mockUserLoginData,
  mockUserRegisterData,
  mockUserResponse, mockUserRoutes, mockUserRouting
} from '../../../mock-data';
import DoneCallback = jest.DoneCallback;
import { HttpClientTestingModule } from '@angular/common/http/testing';
import SpyInstance = jest.SpyInstance;
import { Action } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';


describe('UserEffects', () => {
  let actions$: Observable<any>;
  let effects: UserEffects;
  let userService: UserService;
  let router: Router;
  let metadata: EffectsMetadata<UserEffects>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(mockUserRouting())
      ],
      providers: [
        UserEffects,
        UserService,
        provideMockActions(() => actions$),
        {
          provide: Router,
          useValue: { navigate: jest.fn() } // Mock the Router
        }
      ],
    });

    effects = TestBed.inject(UserEffects);
    userService = TestBed.inject(UserService);
    router = TestBed.inject(Router);
    metadata = getEffectsMetadata(effects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('init$', () => {
    beforeEach(() => {
      actions$ = of(userActions.userInit());
    });

    it('should dispatch checkToken', (done: DoneCallback) => {
      effects.init$.subscribe((action: Action) => {
        expect(action).toEqual(userActions.checkToken());
        done();
      });
    });
  });

  describe('login$', () => {
    let loginSpy: SpyInstance;
    const mockResponse: ResponseDataDto = mockUserResponse();
    const mockError: HttpErrorResponse = new HttpErrorResponse({ /* Mock your error data here */ });

    beforeEach(() => {
      actions$ = of(userActions.loadUser({ data: mockUserLoginData()}));
      loginSpy = jest.spyOn(userService, 'login');
    });

    it('should call login method from userService', (done: DoneCallback) => {
      loginSpy.mockReturnValue(of(mockResponse));
      effects.login$.subscribe(() => {
        expect(loginSpy).toHaveBeenCalledWith(mockUserLoginData());
        done();
      });
    });

    it('should dispatch loadUserSuccess on success', (done: DoneCallback) => {
      loginSpy.mockReturnValue(of(mockResponse));
      effects.login$.subscribe((action: Action) => {
        expect(action).toEqual(userActions.loadUserSuccess({ response: mockResponse }));
        done();
      });
    });

    it('should dispatch loadUserFail on error', (done: DoneCallback) => {
      loginSpy.mockReturnValue(throwError(() => mockError));
      effects.login$.subscribe((action: Action) => {
        expect(action).toEqual(userActions.loadUserFail({ error: mockError }));
        done();
      });
    });
  });

  describe('loadUserSuccess$', () => {
    beforeEach(() => {
      actions$ = of(userActions.loadUserSuccess({ response: mockUserResponse() }));
    });

    it('should dispatch addTokenToLocalStorage', (done: DoneCallback) => {
      effects.loadUserSuccess$.subscribe((action: Action) => {
        expect(action).toEqual(userActions.addTokenToLocalStorage({ response: mockUserResponse() }));
        done();
      });
    });
  });

  describe('loadUserFail$', () => {
    beforeEach(() => {
      actions$ = of(userActions.loadUserFail({ error: mockError() }));
    });

    it('should dispatch setError from appStateActions', (done: DoneCallback) => {
      effects.loadUserFail$.subscribe((action: Action) => {
        expect(action).toEqual(appStateActions.setError(mockError()));
        done();
      });
    });
  });

  describe('register$', () => {
    let registerSpy: SpyInstance;
    const mockResponse: ResponseDataDto = mockUserResponse();
    const mockError: HttpErrorResponse = new HttpErrorResponse({ /* Mock your error data here */ });

    beforeEach(() => {
      actions$ = of(userActions.register({ data: mockUserRegisterData() }));
      registerSpy = jest.spyOn(userService, 'register');
    });

    it('should call register method from userService with correct data', (done: DoneCallback) => {
      registerSpy.mockReturnValue(of(mockResponse));
      effects.register$.subscribe(() => {
        expect(registerSpy).toHaveBeenCalledWith(mockUserRegisterData());
        done();
      });
    });

    it('should dispatch registerSuccess on success', (done: DoneCallback) => {
      registerSpy.mockReturnValue(of(mockResponse));
      effects.register$.subscribe((action: Action) => {
        expect(action).toEqual(userActions.registerSuccess({ response: mockResponse }));
        done();
      });
    });

    it('should dispatch registerFail on error', (done: DoneCallback) => {
      registerSpy.mockReturnValue(throwError(() => mockError));
      effects.register$.subscribe((action: Action) => {
        expect(action).toEqual(userActions.registerFail({ error: mockError }));
        done();
      });
    });
  });

  describe('registerSuccess$', () => {
    beforeEach(() => {
      actions$ = of(userActions.registerSuccess({ response: mockUserResponse() }));
    });

    it('should dispatch addTokenToLocalStorage', (done: DoneCallback) => {
      effects.registerSuccess$.subscribe((action: Action) => {
        expect(action).toEqual(userActions.addTokenToLocalStorage({ response: mockUserResponse() }));
        done();
      });
    });
  });

  describe('registerFail$', () => {
    beforeEach(() => {
      actions$ = of(userActions.registerFail({ error: mockError() }));
    });

    it('should not dispatch any action', () => {
      expect(metadata.registerFail$).toMatchObject({ dispatch: false });
    });
  });

  describe('checkToken$', () => {
    let checkTokenSpy: SpyInstance;
    const mockResponse: ResponseDataDto = mockUserResponse();
    const mockErr: HttpErrorResponse = mockError();

    beforeEach(() => {
      actions$ = of(userActions.checkToken());
      checkTokenSpy = jest.spyOn(userService, 'isTokenValid');
    });

    it('should call isTokenValid method from userService', (done: DoneCallback) => {
      checkTokenSpy.mockReturnValue(of(mockResponse));
      effects.checkToken$.subscribe(() => {
        expect(checkTokenSpy).toHaveBeenCalled();
        done();
      });
    });

    it('should dispatch checkTokenSuccess on success', (done: DoneCallback) => {
      checkTokenSpy.mockReturnValue(of(mockResponse));
      effects.checkToken$.subscribe((action: Action) => {
        expect(action).toEqual(userActions.checkTokenSuccess({ response: mockResponse }));
        done();
      });
    });

    it('should dispatch checkTokenFail on error', (done: DoneCallback) => {
      checkTokenSpy.mockReturnValue(throwError(() => mockErr));
      effects.checkToken$.subscribe((action: Action) => {
        expect(action).toEqual(userActions.checkTokenFail({ error: mockErr }));
        done();
      });
    });
  });

  describe('checkTokenSuccess$', () => {
    beforeEach(() => {
      actions$ = of(userActions.checkTokenSuccess({ response: mockUserResponse() }));
    });

    it('should dispatch userInitialized', (done: DoneCallback) => {
      effects.checkTokenSuccess$.subscribe((action: Action) => {
        expect(action).toEqual(userActions.userInitialized({ userId: mockUserResponse().data.id }));
        done();
      });
    });
  });

  describe('addTokenToLocalStorage$', () => {
    let localStorageSpy: SpyInstance;
    beforeEach(() => {
      actions$ = of(userActions.addTokenToLocalStorage({ response: mockUserResponse() }));
      localStorageSpy = jest.spyOn(window.localStorage['__proto__'], 'setItem');
    });

    it('should call setItem on localStorage', (done: DoneCallback) => {
      effects.addTokenToLocalStorage$.subscribe(() => {
        expect(localStorageSpy).toHaveBeenCalledWith('userToken', mockUserResponse().token);
        done();
      });
    });

    it('should dispatch userActions.userInitialized with userId', (done: DoneCallback) => {
      effects.addTokenToLocalStorage$.subscribe((action: Action) => {
        expect(action).toEqual(userActions.userInitialized({ userId: mockUserResponse().data.id }));
        done();
      });
    });
  });

  describe('navigateToProfile$', () => {
    let routerSpy: SpyInstance;

    beforeEach(() => {
      routerSpy = jest.spyOn(router, 'navigate');
      actions$ = of(userActions.registerSuccess({ response: mockUserResponse() }));
    });

    it('should navigate to home page', (done: DoneCallback) => {
      effects.navigateToProfile$.subscribe(() => {
        expect(routerSpy).toHaveBeenCalledWith(mockUserRoutes().home);
        done();
      });
    });

    it('should not dispatch', () => {
      expect(metadata.navigateToProfile$).toMatchObject({ dispatch: false });
    });
  });

  describe('removeTokenCases$', () => {
    let localStorageSpy: SpyInstance;

    beforeEach(() => {
      actions$ = of(userActions.logout());
      localStorageSpy = jest.spyOn(window.localStorage['__proto__'], 'removeItem');
    });

    it('should call localStorage.removeItem on userToken', (done: DoneCallback) => {
      effects.removeTokenCases$.subscribe(() => {
        expect(localStorageSpy).toHaveBeenCalledWith('userToken');
        done();
      });
    });

    it('should not dispatch', () => {
      expect(metadata.removeTokenCases$).toMatchObject({ dispatch: false });
    });
  });

  describe('redirectAfterLogout$', () => {
    let routerSpy: SpyInstance;

    beforeEach(() => {
      routerSpy = jest.spyOn(router, 'navigate');
      actions$ = of(userActions.logout());
    });

    it('should redirect to login page', (done: DoneCallback) => {
      effects.redirectAfterLogout$.subscribe(() => {
        expect(routerSpy).toHaveBeenCalledWith(mockUserRoutes().login);
        done();
      });
    });

    it('should not dispatch', () => {
      expect(metadata.redirectAfterLogout$).toMatchObject({ dispatch: false });
    })
  })

});
