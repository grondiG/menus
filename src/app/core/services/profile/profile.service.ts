import { inject, Injectable } from '@angular/core';
import { LoginData } from "../../models/login-data";
import { Observable } from "rxjs";
import { RegisterData } from "../../models/register-data";
import { HttpClient } from "@angular/common/http";
import { ProfileState } from '../../../store/profile/profile.reducer';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private http: HttpClient = inject(HttpClient);
  private router: Router = inject(Router);

  constructor() {
  }

  login(credentials: LoginData): Observable<ProfileState> {
    return this.http.post<ProfileState>('/api/login', credentials);
  }

  register(credentials: RegisterData): Observable<ProfileState> {
    return this.http.post<ProfileState>('/api/register', credentials);
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
}
