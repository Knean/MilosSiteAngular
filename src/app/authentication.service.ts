import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject, Subscription } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';


import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
mario:User


  constructor(private http: HttpClient) { }

  public user = new BehaviorSubject<User>(null)

  login(username, password) {
    let csrf = this.getCookie('csrftoken')
    let csrfheader = new HttpHeaders({ 'X-CSRFToken': csrf })
    console.log(this.getHost() + "auth/login/")
    this.http.post(this.getHost() + "auth/login/", { "username": username, "password": password }, { headers: csrfheader }).
      subscribe(() => this.get_user())
  }
  logout() {

    this.http.get(this.getHost() + "auth/logout/")
      .subscribe(() => {
        this.get_user();// this.refreshCart()

      })
  }


  register(username, password) {
    this.http.post(this.getHost() + "auth/register/", { "username": username, "password": password })
      .subscribe(() => {
        this.login(username, password);
        this.get_user()
      })
  }

  get_user() {
    console.log("this is the address" + this.getHost())

    this.http.get(this.getHost() + "auth/user/").subscribe((data: any) => {
      console.log(data, "this is the data")
      if (data.username) {
        this.user.next(data)
        console.log(data.username)
      }
      else {
        this.user.next(null)
      }
    })
  }

  get_users(): Observable<User[]> {
    let users: User[]
    return this.http.get<User[]>(this.getHost() + "users/")
  }

  getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      var cookies = document.cookie.split(';');
      for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        // Does this cookie string begin with the name we want?
        if (cookie.substring(0, name.length + 1) === (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }

  public getHost() {
    var host = window.location.host
    if (host == "localhost:4200" || host == "127.0.0.1:8000") {
      return "http://127.0.0.1:8000/"
    }
    else {
      return "https://limitless-wildwood-61701.herokuapp.com/"
    }
  }

}
