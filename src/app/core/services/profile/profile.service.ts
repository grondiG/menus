import {inject, Injectable} from '@angular/core';
import {LoginData} from "../../models/login-data";
import {Observable, of} from "rxjs";
import {RegisterData} from "../../models/register-data";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private http: HttpClient = inject(HttpClient);

  constructor() { }

  login(credentials: LoginData): Observable<any> {
    console.log(credentials);

    return of(null)
  }

  register(credentials: RegisterData): Observable<any> {
    return this.http.post('/api/register', credentials);
  }
}
