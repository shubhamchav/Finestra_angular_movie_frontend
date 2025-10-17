import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUserInfo(): Observable<any> {
    // Adjust the endpoint if your backend uses a different path
    return this.http.get<any>(`${environment.apiBaseUrl}/user/me`);
  }
}
