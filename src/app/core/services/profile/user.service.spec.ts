import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { LoginData, RegisterData, ResponseDataDto } from '../../models/authentication';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import DoneCallback = jest.DoneCallback;

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [ UserService ]
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);

  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('login', () => {
    it('should make post request', (done: DoneCallback) => {
      const expectedResult = { data: {}, token: '' };
      const credentials: LoginData = { login: 'login', password: 'password' };

      service.login(credentials).subscribe({
        next: (result: ResponseDataDto) => {
          expect(result).toEqual(expectedResult);
          done();
        }
      });

      const request: TestRequest = httpMock.expectOne('/api/login');
      expect(request.request.method).toEqual('POST');
      request.flush({ data: {}, token: '' });
    });
  });

  describe('register', () => {
    it('should make post request', (done: DoneCallback) => {
      const expectedResult = { data: {}, token: '' };
      const credentials: RegisterData = { login: 'login', password: 'password' } as RegisterData;

      service.register(credentials).subscribe({
        next: (result: ResponseDataDto) => {
          expect(result).toEqual(expectedResult);
          done();
        }
      });

      const request: TestRequest = httpMock.expectOne('/api/register');
      expect(request.request.method).toEqual('POST');
      request.flush({ data: {}, token: '' });
    });
  });

  describe('isTokenValid', () => {
    it('should make get request', (done: DoneCallback) => {
      const expectedResult = { data: {}, token: '' };

      service.isTokenValid().subscribe({
        next: (result: ResponseDataDto) => {
          expect(result).toEqual(expectedResult);
          done();
        }
      });

      const request: TestRequest = httpMock.expectOne('/api/isTokenValid');
      expect(request.request.method).toEqual('GET');
      request.flush({ data: {}, token: '' });
    });
  });

  describe('checkName', () => {
    it('should make get request', (done: DoneCallback) => {
      const expectedResult = { exists: true };

      service.checkName('name').subscribe({
        next: (result: { exists: boolean }) => {
          expect(result).toEqual(expectedResult);
          done();
        }
      });

      const request: TestRequest = httpMock.expectOne('/api/ifNameExists?name=name');
      expect(request.request.method).toEqual('GET');
      request.flush({ exists: true });
    });
  });
});
