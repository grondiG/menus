import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginData, RegisterData, ResponseDataDto } from '../../models/authentication';

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

  navigateToHome(): void {
    this.router.navigate(['/home']);
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
