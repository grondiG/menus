import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginData, RegisterData, ResponseDataDto } from '../../models/authentication';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http: HttpClient = inject(HttpClient);

  login(credentials: LoginData): Observable<ResponseDataDto> {
    return this.http.post<ResponseDataDto>('/api/login', credentials);
  }

  register(credentials: RegisterData): Observable<ResponseDataDto> {
    return this.http.post<ResponseDataDto>('/api/register', credentials);
  }

  isTokenValid(): Observable<ResponseDataDto> {
    return this.http.get<ResponseDataDto>('/api/isTokenValid');
  }

  checkName(name: string): Observable<{ exists: boolean }> {
    return this.http.get<{ exists: boolean }>(`/api/ifNameExists?name=${name}`);
  }
}
