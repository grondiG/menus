import { inject, Injectable } from '@angular/core';
import { LoginData } from "../../models/login-data";
import { Observable } from "rxjs";
import { RegisterData } from "../../models/register-data";
import { HttpClient } from "@angular/common/http";
import { UserState } from '../../../store/user/user.reducer';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http: HttpClient = inject(HttpClient);
  private router: Router = inject(Router);

  constructor() {
  }

  login(credentials: LoginData): Observable<UserState> {
    return this.http.post<UserState>('/api/login', credentials);
  }

  register(credentials: RegisterData): Observable<UserState> {
    return this.http.post<UserState>('/api/register', credentials);
  }

  addTokenToLocalStorage(token: string): void {
    localStorage.setItem('token', token);
  }

  navigateToProfile(): void {
    this.router.navigate(['/profile']);
  }

  removeTokenFromLocalStorage(): void {
    localStorage.removeItem('token');
  }

  isTokenValid(): Observable<UserState> {
    return this.http.get<UserState>('/api/isTokenValid');
  }
}
