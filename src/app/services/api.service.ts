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

  loggedInUserAPI(logInData: any): Observable<Object> {
    const loginUrl = GlobalURL.BaseURL + 'login';
    return this.http.post(loginUrl, logInData, {
      withCredentials: true
    });
  }

  getUserProfile(): Observable<object> {
    const profileUrl = GlobalURL.BaseURL + 'profile/view';
    return this.http.get(profileUrl, {
      withCredentials: true
    });
  }

  logOutUser(): Observable<object> {
    return this.http.get(GlobalURL.BaseURL + 'logout', {
      withCredentials: true
    });
  }

  getFeedData(): Observable<object> {
    return this.http.get(GlobalURL.BaseURL + 'feed', {
      withCredentials: true
    });
  }

  editUserProfile(editUserData: any): Observable<object> {
    return this.http.patch(GlobalURL.BaseURL + 'profile/edit', editUserData, {
      withCredentials: true
    })
  }

  signInUser(userData: object): Observable<any> {
    return this.http.post(GlobalURL.BaseURL + "signin", userData, {
      withCredentials: true
    });
  }

  getConnections(): Observable<object> {
    return this.http.get(GlobalURL.BaseURL + 'user/connections', {
      withCredentials: true
    });
  }

  getRequests(): Observable<object> {
    return this.http.get(GlobalURL.BaseURL + 'user/requests/received', {
      withCredentials: true
    });
  }

  requestAction(requestStatus: string, requestId: string): Observable<object>{
    return this.http.post(GlobalURL.BaseURL + "request/review/" + requestStatus + "/" + requestId, {}, {
      withCredentials: true
    })
  }

  feedAction(requestStatus: string, userId: string): Observable<object>{
    return this.http.post(GlobalURL.BaseURL + "request/connect/" + requestStatus + "/" + userId, {}, {
      withCredentials: true
    })
  }

}
