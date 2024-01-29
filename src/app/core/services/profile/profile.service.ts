import { inject, Injectable } from '@angular/core';
import { LoginData } from "../../models/login-data";
import { Observable } from "rxjs";
import { RegisterData } from "../../models/register-data";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private http: HttpClient = inject(HttpClient);

  constructor() {
  }

  login(credentials: LoginData): Observable<any> {
    return this.http.post('/api/login', credentials);
  }

  register(credentials: RegisterData): Observable<any> {
    return this.http.post('/api/register', credentials);
  }
}
