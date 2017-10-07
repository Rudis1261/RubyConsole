import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { environment as ENV } from "../../environments/environment";

@Injectable()
export class ApiService {

  private headers: Headers;
  private options: RequestOptions;
  public token: any = localStorage.getItem('token') || false;
  public apiToken = new BehaviorSubject(null);
  //public fcmToken: any = localStorage.getItem('fcm_token') || false;

  constructor(private http: Http) {
    //this.token = localStorage.getItem('token') || false;
    //this.apiToken.next(this.token);
  }

  getToken() {
    return this.token;
  }

  setToken(token) {
    this.token = token;

    if (token == false) {
      localStorage.removeItem('token');
      this.apiToken.next(false);
      return true;
    }

    if (token) {
      localStorage.setItem('token', token || false);
      this.apiToken.next([...token]);
    }
  }

  getHeaders() {
    this.headers = new Headers({
      'Content-Type': 'application/json'
    });

    if (this.token && this.token !== false) {
      this.headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization': this.token
      });
    }

    this.options = new RequestOptions({
      headers: this.headers,
      withCredentials: true
    });

    return this.options;
  }

  apiCall(url, params={}) {
    this.options = this.getHeaders();
    //params = this.addFCMToken(params);
    return this.http.post(url, params, this.options)
                    .map((res:Response) => {
                      return res.json();
                    })
                    .catch((error:any) => this.errorHandler(error));
  }

  apiGetCall(url, params={}) {
    this.options = this.getHeaders();
    //params = this.addFCMToken(params);
    return this.http.get(url, this.options)
                    .map((res:Response) => {
                      return res.json();
                    })
                    .catch((error:any) => this.errorHandler(error));
  }

  apiPostCall(url, params={}) {
    return this.apiCall(url, params);
  }

  errorHandler(res) {
    console.error(res);
    return Observable.throw({
      'message': 'Server error, try again later'
    });
  }
}
