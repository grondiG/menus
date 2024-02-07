import { inject, Injectable } from '@angular/core';
import { LoginData, ResponseDataDto } from '../../models/login-data';
import { Observable } from 'rxjs';
import { RegisterData } from '../../models/register-data';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http: HttpClient = inject(HttpClient);
  private router: Router = inject(Router);

  constructor() {
  }

  login(credentials: LoginData): Observable<ResponseDataDto> {
    return this.http.post<ResponseDataDto>('/api/login', credentials);
  }

  register(credentials: RegisterData): Observable<ResponseDataDto> {
    return this.http.post<ResponseDataDto>('/api/register', credentials);
  }

  addTokenToLocalStorage(token: string): void {
    localStorage.setItem('token', token);
  }

  navigateToProfile(): void {
    this.router.navigate(['/profile']);
  }

  navigateToLogin(): void {
    this.router.navigate(['profile','login']);
  }

  removeTokenFromLocalStorage(): void {
    localStorage.removeItem('token');
  }

  isTokenValid(): Observable<ResponseDataDto> {
    return this.http.get<ResponseDataDto>('/api/isTokenValid');
  }
}
