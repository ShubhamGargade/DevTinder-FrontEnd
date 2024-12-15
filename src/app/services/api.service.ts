import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalURL } from '../constant/globalUrl';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  loggedInUserAPI(logInData: any): Observable<Object>{
    const loginUrl = GlobalURL.BaseURL + 'login';
    return this.http.post(loginUrl, logInData, {
      withCredentials: true
    });
  }

  getUserProfile(): Observable<object>{
    const profileUrl = GlobalURL.BaseURL + 'profile/view';
    return this.http.get(profileUrl, {
      withCredentials: true
    });
  }

  logOutUser(): Observable<object>{
    return this.http.get(GlobalURL.BaseURL + 'logout', {
      withCredentials: true
    });
  }

  getFeedData(): Observable<object>{
    return this.http.get(GlobalURL.BaseURL + 'feed', {
      withCredentials: true
    });
  }
}
