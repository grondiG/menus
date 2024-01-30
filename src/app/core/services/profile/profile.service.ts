import { inject, Injectable } from '@angular/core';
import { LoginData } from "../../models/login-data";
import { Observable } from "rxjs";
import { RegisterData } from "../../models/register-data";
import { HttpClient } from "@angular/common/http";
import { ProfileState } from '../../../store/profile/profile.reducer';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private http: HttpClient = inject(HttpClient);

  constructor() {
  }

  login(credentials: LoginData): Observable<ProfileState> {
    return this.http.post<ProfileState>('/api/login', credentials);
  }
  // TODO provide type
  register(credentials: RegisterData): Observable<any> {
    return this.http.post('/api/register', credentials);
  }

  addTokenToLocalStorage(token: string): void {
    localStorage.setItem('token', token);
  }

  removeTokenFromLocalStorage(): void {
    localStorage.removeItem('token');
  }
}
